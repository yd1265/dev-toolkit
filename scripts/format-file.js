#!/usr/bin/env node
// PostToolUse hook (Edit|Write): formats the file that was just written.
// JS/TS/Angular/React files -> Prettier. Java files -> Maven/Gradle Spotless
// via the project's own build config. Never blocks the edit on failure.

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function readHookInput() {
  try {
    return JSON.parse(fs.readFileSync(0, "utf-8"));
  } catch {
    return null;
  }
}

function findUp(startDir, fileNames) {
  let dir = startDir;
  while (true) {
    for (const name of fileNames) {
      if (fs.existsSync(path.join(dir, name))) {
        return dir;
      }
    }
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

const PRETTIER_EXTS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".html", ".css", ".scss", ".json", ".md",
]);

function formatWithPrettier(filePath) {
  execSync(`npx --yes prettier --write "${filePath}"`, {
    cwd: path.dirname(filePath),
    stdio: "pipe",
  });
}

function formatJava(filePath) {
  const dir = path.dirname(filePath);
  const mavenRoot = findUp(dir, ["pom.xml"]);
  const gradleRoot = findUp(dir, ["build.gradle", "build.gradle.kts"]);

  // Prefer whichever build root is closer to the file.
  if (mavenRoot && (!gradleRoot || mavenRoot.length >= gradleRoot.length)) {
    execSync("mvn -q spotless:apply", { cwd: mavenRoot, stdio: "pipe" });
    return;
  }
  if (gradleRoot) {
    const wrapper = process.platform === "win32" ? "gradlew.bat" : "./gradlew";
    const hasWrapper = fs.existsSync(path.join(gradleRoot, wrapper.replace("./", "")));
    const cmd = hasWrapper ? wrapper : "gradle";
    execSync(`${cmd} spotlessApply -q`, { cwd: gradleRoot, stdio: "pipe" });
    return;
  }
  throw new Error("no pom.xml or build.gradle(.kts) found above file");
}

const input = readHookInput();
const filePath = input && input.tool_input && input.tool_input.file_path;

if (!filePath || !fs.existsSync(filePath)) {
  process.exit(0);
}

const ext = path.extname(filePath).toLowerCase();

try {
  if (ext === ".java") {
    formatJava(filePath);
  } else if (PRETTIER_EXTS.has(ext)) {
    formatWithPrettier(filePath);
  }
} catch (err) {
  // Formatting is best-effort; never block the edit on a formatter failure.
  process.stderr.write(`[dev-toolkit] format-file: skipped (${err.message})\n`);
}

process.exit(0);
