const crypto = require("crypto");
const fs = require("fs");
const https = require("https");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

// Copied from the official v0.88.1 hugo_0.88.1_checksums.txt release asset:
// https://github.com/gohugoio/hugo/releases/tag/v0.88.1
// Keep the version and these checksums together when deliberately upgrading Hugo.
const releases = {
  "0.88.1": {
    "linux-x64": ["Linux-64bit.tar.gz", "51850899dcd76f71c76004b9be28c7c1ea1b645d7227ff79534f773acd5e88fe"],
    "darwin-x64": ["macOS-64bit.tar.gz", "43bfd9a05d7c8cff85525818ac86001406a73058cb4cab945c24da959709018b"],
    "darwin-arm64": ["macOS-ARM64.tar.gz", "b9705d64c7df9b3777ab8d5fb036126b0886b6d2c5d7f35aeae2197af8a01847"],
    "win32-x64": ["Windows-64bit.zip", "aaa20e258cd668cff66400d365d73ddc375e44487692d49a5285b56330f6e6b2"],
  },
};
const downloadHosts = new Set([
  "github.com",
  "release-assets.githubusercontent.com",
  "objects.githubusercontent.com",
  "github-releases.githubusercontent.com",
]);
const maxArchiveBytes = 32 * 1024 * 1024;

function selectRelease(version, platform, arch) {
  const targets = releases[version];
  if (!targets) {
    throw new Error(`No verified Hugo Extended release is configured for ${version}. Add official checksums before changing otherDependencies.hugo.`);
  }
  const target = targets[`${platform}-${arch}`];
  if (!target) {
    throw new Error(`Hugo Extended ${version} is not available for ${platform}/${arch}. Supported targets: ${Object.keys(targets).join(", ")}.`);
  }
  const [suffix, checksum] = target;
  const filename = `hugo_extended_${version}_${suffix}`;
  return {
    version,
    filename,
    checksum,
    binary: platform === "win32" ? "hugo.exe" : "hugo",
    url: `https://github.com/gohugoio/hugo/releases/download/v${version}/${filename}`,
  };
}

function validateDownloadUrl(value) {
  const url = new URL(value);
  if (url.protocol !== "https:" || !downloadHosts.has(url.hostname) || url.username || url.password || (url.port && url.port !== "443")) {
    throw new Error(`Refusing Hugo download from an unapproved URL: ${url.origin}`);
  }
  return url;
}

function downloadArchive(value, redirectsRemaining = 5) {
  return new Promise((resolve, reject) => {
    const url = validateDownloadUrl(value);
    const request = https.get(url, { headers: { "User-Agent": "lotus-docs-hugo-installer" } }, (response) => {
      if ([301, 302, 303, 307, 308].includes(response.statusCode)) {
        response.resume();
        if (redirectsRemaining === 0 || !response.headers.location) {
          reject(new Error("Hugo download exceeded its redirect limit or returned an empty redirect."));
          return;
        }
        try {
          downloadArchive(new URL(response.headers.location, url), redirectsRemaining - 1).then(resolve, reject);
        } catch (error) {
          reject(error);
        }
        return;
      }
      if (response.statusCode !== 200) {
        response.resume();
        reject(new Error(`Hugo download failed with HTTP ${response.statusCode}.`));
        return;
      }
      const chunks = [];
      let bytes = 0;
      response.on("data", (chunk) => {
        bytes += chunk.length;
        if (bytes > maxArchiveBytes) {
          request.destroy(new Error("Hugo download exceeded the 32 MiB archive limit."));
          return;
        }
        chunks.push(chunk);
      });
      response.on("end", () => resolve(Buffer.concat(chunks)));
      response.on("error", reject);
    });
    const deadline = setTimeout(() => request.destroy(new Error("Hugo download exceeded its 60 second deadline.")), 60_000);
    request.on("close", () => clearTimeout(deadline));
    request.setTimeout(30_000, () => request.destroy(new Error("Hugo download timed out.")));
    request.on("error", reject);
  });
}

function verifyChecksum(archive, release) {
  const actual = crypto.createHash("sha256").update(archive).digest("hex");
  if (actual !== release.checksum) {
    throw new Error(`SHA-256 mismatch for ${release.filename}; refusing to extract or run it.`);
  }
}

function extractBinary(archivePath, binary) {
  try {
    // Read only the fixed binary member to stdout. Never extract archive paths,
    // symlinks, or hardlinks into the repository or temporary directory.
    return execFileSync("tar", ["-xOf", archivePath, binary], {
      maxBuffer: 128 * 1024 * 1024,
      timeout: 30_000,
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    throw new Error(`Could not read ${binary} from the verified Hugo archive. Install system tar (included with macOS, Linux and Windows 10/11). ${error.message}`);
  }
}

async function installHugo({
  root = path.resolve(__dirname, ".."),
  version = require("../package.json").otherDependencies.hugo,
  platform = process.platform,
  arch = process.arch,
  download = downloadArchive,
  extract = extractBinary,
} = {}) {
  const release = selectRelease(version, platform, arch);
  const archive = await download(release.url);
  verifyChecksum(archive, release);

  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "lotus-docs-hugo-"));
  let stagedDirectory;
  try {
    const archivePath = path.join(temporaryDirectory, release.filename);
    fs.writeFileSync(archivePath, archive);
    const temporaryBinary = path.join(temporaryDirectory, release.binary);
    fs.writeFileSync(temporaryBinary, extract(archivePath, release.binary), { mode: 0o755 });
    const output = execFileSync(temporaryBinary, ["version"], { encoding: "utf8", timeout: 10_000 }).trim();
    const versionPattern = new RegExp(`^hugo v${version.replace(/\./g, "\\.")}(?:[-+\\s]|$)`);
    if (!versionPattern.test(output) || !output.includes("+extended")) {
      throw new Error(`Downloaded Hugo failed its version/Extended check: ${output}`);
    }

    const destinationDirectory = path.join(root, "node_modules", ".bin", "hugo");
    fs.mkdirSync(destinationDirectory, { recursive: true });
    stagedDirectory = fs.mkdtempSync(path.join(destinationDirectory, ".install-"));
    const stagedBinary = path.join(stagedDirectory, release.binary);
    fs.copyFileSync(temporaryBinary, stagedBinary, fs.constants.COPYFILE_EXCL);
    fs.chmodSync(stagedBinary, 0o755);
    const destination = path.join(destinationDirectory, release.binary);
    fs.renameSync(stagedBinary, destination);
    console.log(`Installed ${output}`);
    return destination;
  } finally {
    if (stagedDirectory) fs.rmSync(stagedDirectory, { recursive: true, force: true });
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  }
}

if (require.main === module) {
  installHugo().catch((error) => {
    console.error(`Hugo installation failed: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { selectRelease, validateDownloadUrl, verifyChecksum, extractBinary, installHugo };
