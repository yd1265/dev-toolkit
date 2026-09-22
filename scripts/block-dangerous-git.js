#!/usr/bin/env node
// PreToolUse hook (Bash): blocks destructive/irreversible git commands.
// Exit code 2 + stderr blocks the tool call and the reason is shown to Claude.
// Exit code 0 allows it to proceed.

const fs = require("fs");

function readHookInput() {
  try {
    return JSON.parse(fs.readFileSync(0, "utf-8"));
  } catch {
    return null;
  }
}

const DANGEROUS_PATTERNS = [
  { re: /\bgit\s+push\b(?!.*--force-with-lease)[^|;&]*(--force|-f\b)/i, why: "force push (rewrites remote history)" },
  { re: /\bgit\s+reset\s+.*--hard\b/i, why: "hard reset (discards uncommitted work)" },
  { re: /\bgit\s+clean\s+.*-[a-z]*f[a-z]*d/i, why: "git clean -fd (permanently deletes untracked files)" },
  { re: /\bgit\s+branch\s+.*-D\b/i, why: "force branch delete" },
  { re: /\bgit\s+push\s+.*--delete\b/i, why: "deletes a remote branch" },
  { re: /\bgit\s+filter-branch\b/i, why: "rewrites repository history" },
  { re: /\bgit\s+checkout\s+.*--\s*\.\s*$/i, why: "discards all local changes" },
  { re: /\bgit\s+stash\s+(clear|drop)\b/i, why: "permanently discards stashed work" },
  { re: /\bgit\s+gc\s+.*--prune=now\b/i, why: "aggressively prunes unreachable objects" },
];

const input = readHookInput();
const toolName = input && input.tool_name;
const command = input && input.tool_input && input.tool_input.command;

if (toolName !== "Bash" || !command) {
  process.exit(0);
}

for (const { re, why } of DANGEROUS_PATTERNS) {
  if (re.test(command)) {
    process.stderr.write(
      `[dev-toolkit] Blocked: "${command}"\nReason: ${why}. If this is intentional, run it manually outside Claude Code.\n`
    );
    process.exit(2);
  }
}

process.exit(0);
