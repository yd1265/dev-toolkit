---
description: >
  Reviews Java code for correctness, security, resource management, and
  Spring conventions. Use when reviewing .java files or a Java PR/diff.
paths:
  - "**/*.java"
---

Review the given Java code for:

1. **Correctness** — null handling, off-by-one errors, boundary conditions
2. **Security** — injection, unsafe deserialization, missing input validation
3. **Resource management** — unclosed streams/connections, missing try-with-resources
4. **Exception handling** — swallowed exceptions, overly broad catches
5. **Concurrency** — thread-safety, improper synchronization, shared mutable state
6. **Spring-specific** — misconfigured beans, missing transactional boundaries, N+1 queries

Reference specific file/line locations. Prioritize high-impact issues over style nits.
