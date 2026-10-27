const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { test } = require("node:test");
const { selectRelease, validateDownloadUrl, verifyChecksum, installHugo } = require("./install-hugo");

test("supported platforms select official Extended archives and fixed binary names", () => {
  for (const [platform, arch, suffix, binary] of [
    ["linux", "x64", "Linux-64bit.tar.gz", "hugo"],
    ["darwin", "x64", "macOS-64bit.tar.gz", "hugo"],
    ["darwin", "arm64", "macOS-ARM64.tar.gz", "hugo"],
    ["win32", "x64", "Windows-64bit.zip", "hugo.exe"],
  ]) {
    const release = selectRelease("0.88.1", platform, arch);
    assert.equal(release.filename, `hugo_extended_0.88.1_${suffix}`);
    assert.equal(release.binary, binary);
    assert.equal(new URL(release.url).hostname, "github.com");
    assert.match(release.checksum, /^[a-f0-9]{64}$/);
  }
});

test("unsupported architectures and unreviewed versions fail without a standard-Hugo fallback", () => {
  assert.throws(() => selectRelease("0.88.1", "linux", "arm64"), /not available/);
  assert.throws(() => selectRelease("0.88.1", "win32", "arm64"), /not available/);
  assert.throws(() => selectRelease("0.89.0", "linux", "x64"), /No verified/);
});

test("downloads accept only HTTPS GitHub release hosts, including redirects", () => {
  assert.equal(validateDownloadUrl("https://release-assets.githubusercontent.com/example").protocol, "https:");
  for (const url of [
    "http://github.com/example",
    "https://github.com.example.org/example",
    "https://example.org/archive",
    "https://user:password@github.com/archive",
    "https://github.com:8443/archive",
  ]) {
    assert.throws(() => validateDownloadUrl(url), /unapproved URL/);
  }
});

test("corrupt or substituted downloads fail checksum validation", () => {
  assert.throws(() => verifyChecksum(Buffer.from("not an official Hugo archive"), selectRelease("0.88.1", "linux", "x64")), /SHA-256 mismatch/);
});

test("checksum failure never invokes the extractor or overwrites an existing installation", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "lotus-hugo-test-"));
  const destination = path.join(root, "node_modules", ".bin", "hugo", "hugo");
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, "existing installation");
  let extracted = false;
  try {
    await assert.rejects(installHugo({
      root,
      version: "0.88.1",
      platform: "linux",
      arch: "x64",
      download: async () => Buffer.from("corrupted archive"),
      extract: () => { extracted = true; throw new Error("must not extract"); },
    }), /SHA-256 mismatch/);
    assert.equal(extracted, false);
    assert.equal(fs.readFileSync(destination, "utf8"), "existing installation");
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
