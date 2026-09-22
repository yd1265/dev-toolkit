---
description: >
  Reviews React code for correctness, hooks usage, and rendering pitfalls.
  Use when reviewing .jsx/.tsx files in a React project.
paths:
  - "**/*.jsx"
  - "**/*.tsx"
---

Review the given React code for:

1. **Hooks correctness** — missing/incorrect `useEffect`/`useMemo`/`useCallback` dependency arrays
2. **Lists** — missing or unstable `key` props
3. **Rendering** — unnecessary re-renders, state that should be derived instead of duplicated
4. **State management** — direct state mutation, stale closures
5. **Accessibility** — missing labels/roles, non-semantic markup in JSX

Reference specific file/line locations. Prioritize high-impact issues over style nits.
