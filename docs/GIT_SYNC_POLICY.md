# GIT_SYNC_POLICY

## 1. Objectives
- Ensure code quality **before** every commit.
- Keep the local-to-remote sync loop under **10 seconds**.
- Maintain the "Zero Regressions" state.

## 2. Quality Gate (Pre-Commit)
Every commit triggers:
1. `npm run test:related`: Runs Vitest only on changed files (Critical for speed).
2. `npm run lint`: Runs ESLint on staged files.

**Failure at either step cancels the commit.**

## 3. Remote Sync (Push)
- Pushing to `main` triggers an automatic build on Vercel.
- The `dist/` folder is **ignored** locally; Vercel builds from source.
- Do not push if build errors are visible in the terminal.

## 4. Automation Tools
- **Husky**: Manages the git hooks.
- **lint-staged**: Optimizes checking to only changed files.
- **Vitest**: Configured with `pool: 'vmThreads'` for resource-constrained environments.

---
*Version 1.0.0 | Genial Blueprint Standard*
