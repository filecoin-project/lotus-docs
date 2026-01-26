const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const contentDir = path.join(repoRoot, "content", "en");
const headersTemplatePath = path.join(repoRoot, "layouts", "index.headers");
const outputPath = path.join(repoRoot, "vercel.json");

function readFrontMatter(fileContents) {
  const match = fileContents.match(/^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/);
  if (!match) return {};
  const frontMatter = match[1];
  const lines = frontMatter.split("\n");
  const data = {};

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    const inlineAliases = line.match(/^aliases:\s*\[(.*)\]\s*$/);
    if (inlineAliases) {
      const raw = inlineAliases[1]
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
      data.aliases = raw;
      continue;
    }

    if (/^aliases:\s*$/.test(line)) {
      const aliases = [];
      for (let j = i + 1; j < lines.length; j += 1) {
        const aliasLine = lines[j];
        if (!/^\s*- /.test(aliasLine)) break;
        const value = aliasLine.replace(/^\s*-\s*/, "").trim();
        if (value) {
          aliases.push(value.replace(/^["']|["']$/g, ""));
        }
        i = j;
      }
      data.aliases = aliases;
      continue;
    }

    const urlMatch = line.match(/^url:\s*(.+)\s*$/);
    if (urlMatch) {
      data.url = urlMatch[1].trim().replace(/^["']|["']$/g, "");
      continue;
    }

    const slugMatch = line.match(/^slug:\s*(.+)\s*$/);
    if (slugMatch) {
      data.slug = slugMatch[1].trim().replace(/^["']|["']$/g, "");
    }
  }

  return data;
}

function normalizePath(value, { trailingSlash } = { trailingSlash: false }) {
  if (!value) return "/";
  let normalized = value.trim();
  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  if (trailingSlash && !normalized.endsWith("/")) normalized += "/";
  return normalized;
}

function destinationForFile(filePath, frontMatter) {
  if (frontMatter.url) {
    return normalizePath(frontMatter.url, { trailingSlash: frontMatter.url.endsWith("/") });
  }

  const relative = path.relative(contentDir, filePath);
  const parsed = path.parse(relative);
  const dirParts = parsed.dir
    ? parsed.dir.split(path.sep).filter(Boolean)
    : [];

  if (parsed.name === "_index" || parsed.name === "index") {
    const basePath = `/${dirParts.join("/")}`;
    return normalizePath(basePath, { trailingSlash: true });
  }

  const slug = frontMatter.slug || parsed.name;
  const basePath = `/${dirParts.concat(slug).join("/")}`;
  return normalizePath(basePath, { trailingSlash: true });
}

function collectMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

function parseHeaders() {
  const contents = fs.readFileSync(headersTemplatePath, "utf8");
  const lines = contents.split("\n");
  const headers = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed === "/*") continue;
    const headerMatch = trimmed.match(/^([^:]+):\s*(.+)$/);
    if (!headerMatch) continue;
    headers.push({
      key: headerMatch[1].trim(),
      value: headerMatch[2].trim(),
    });
  }

  return headers;
}

function buildRedirects() {
  const files = collectMarkdownFiles(contentDir);
  const redirects = [];
  const seenSources = new Map();

  for (const filePath of files) {
    const contents = fs.readFileSync(filePath, "utf8");
    const frontMatter = readFrontMatter(contents);
    if (!frontMatter.aliases || frontMatter.aliases.length === 0) continue;

    const destination = destinationForFile(filePath, frontMatter);
    for (const alias of frontMatter.aliases) {
      const source = normalizePath(alias, { trailingSlash: alias.endsWith("/") });
      if (source === destination) continue;
      if (seenSources.has(source)) continue;
      seenSources.set(source, destination);
      redirects.push({
        source,
        destination,
        permanent: true,
      });
    }
  }

  redirects.sort((a, b) => a.source.localeCompare(b.source));
  return redirects;
}

function writeVercelConfig() {
  const config = {
    buildCommand: "npm run build",
    installCommand: "npm install",
    outputDirectory: "public",
    headers: [
      {
        source: "/(.*)",
        headers: parseHeaders(),
      },
    ],
    redirects: buildRedirects(),
  };

  fs.writeFileSync(outputPath, JSON.stringify(config, null, 2) + "\n");
  console.log(`Wrote ${path.relative(repoRoot, outputPath)}`);
}

writeVercelConfig();
