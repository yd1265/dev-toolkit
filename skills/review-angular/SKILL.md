---
description: >
  Reviews Angular (TypeScript/HTML) code for correctness, RxJS/subscription
  management, and change-detection pitfalls. Use when reviewing Angular
  component/service/module files or templates.
paths:
  - "**/*.component.ts"
  - "**/*.service.ts"
  - "**/*.module.ts"
  - "**/*.directive.ts"
  - "**/*.pipe.ts"
  - "**/*.html"
---

Review the given Angular code for:

1. **Subscription leaks** — missing unsubscribe, prefer async pipe or `takeUntil`
2. **Change detection** — unnecessary OnPush violations, mutating `@Input()` values
3. **RxJS usage** — nested subscribes, missing error handling, improper operator choice
4. **Dependency injection** — incorrect provider scope, circular deps
5. **Templates** — missing `trackBy` on `*ngFor`, unsafe bindings, accessibility gaps

Reference specific file/line locations. Prioritize high-impact issues over style nits.
