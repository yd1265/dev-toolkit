# Dev Toolkit

Shared Claude Code plugin for the team: code review skills for Java, Angular,
and React, a `code-reviewer` and `test-writer` agent, and hooks that
auto-format edited files and block destructive git commands.

## What's included

**Skills** (auto-invoked based on the file you're working on, or run directly):
- `review-java` — Java correctness, security, resource/exception/concurrency review
- `review-angular` — Angular subscription leaks, change detection, RxJS, templates
- `review-react` — React hooks correctness, keys, rendering, state, accessibility

**Agents**:
- `code-reviewer` — read-only, thorough review across Java/Angular/React
- `test-writer` — writes unit/integration tests matching your project's conventions

**Hooks**:
- Format-on-edit — after any `Edit`/`Write`, runs Prettier for JS/TS/HTML/CSS/JSON/MD,
  and Maven Spotless (`mvn spotless:apply`) or Gradle Spotless (`gradlew spotlessApply`)
  for `.java` files, detected from the nearest `pom.xml` / `build.gradle(.kts)`.
- Dangerous-git guard — blocks `Bash` commands like `git push --force`,
  `git reset --hard`, `git clean -fd`, `git branch -D`, `git push --delete`,
  `git filter-branch`, and similar irreversible operations before they run.

## Requirements

- Node.js on PATH (hook scripts run via `node`)
- Prettier is invoked via `npx`, no local install required
- Java formatting requires the project itself to have Maven Spotless
  (`spotless-maven-plugin`) or Gradle Spotless (`com.diffplug.spotless`)
  configured; otherwise Java files are left unformatted (a warning is printed,
  the edit is never blocked)

## Install (team members)

```bash
/plugin marketplace add yd1265/dev-toolkit
/plugin install dev-toolkit@dev-toolkit
```

## Local development / testing

```bash
# Validate plugin structure
claude plugin validate .

# Try it without installing, from this directory
claude --plugin-dir .
```

## Usage

```
/dev-toolkit:review-java
/dev-toolkit:review-angular
/dev-toolkit:review-react

@dev-toolkit:code-reviewer review the changes in src/app/auth
@dev-toolkit:test-writer write tests for src/main/java/com/spire/OrderService.java
```

## License

MIT
