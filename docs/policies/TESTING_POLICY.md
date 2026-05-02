# Testing Policy (TESTING_POLICY)

**Version:** 1.0.0
**Date:** 2026-05-02
**Status:** Active

## Version History
- **1.0.0 (2026-05-02):** Initial version. Defined Vitest as the primary runner and established the `vmThreads` workspace configuration for resource-constrained environments.

---

## Rationale
Testing in "Today's Horizon" ensures the reliability of critical business logic, particularly the bidirectional synchronization with Google Tasks and the complex data management within the "Vibe" ecosystem.

1. **Bidirectional Sync Integrity**: The `googleTasksSync` logic is the most fragile part of the application. Automated tests prevent regressions in record matching, prefix handling, and state resolution.
2. **Standardization**: By using **Vitest**, we align with the Vite build system for faster execution and consistent configuration.
3. **CI/CD Safety**: Enforcing tests at the `pre-push` level ensures that no broken logic reaches the remote repository, maintaining a "green" main branch.

## Configuration Standards

### Framework: Vitest
- **Why**: Native Vite support, Jest-compatible API, and significantly faster than Jest in ESM-first projects.
- **Environment**: `jsdom` for component testing, `node` for service/utility testing.

### File Naming
- Unit tests: `[name].test.ts` or `[name].test.tsx`.
- Integration tests: `[name].spec.ts`.
- Location: Place tests alongside the source code they test (e.g., `services/prefixUtils.test.ts`).

### Tooling
- **React Testing Library**: For testing components from a user's perspective.
- **MSW (Mock Service Worker)**: (Future) For mocking Supabase and Google Tasks API responses.

## Replication Guide for Other Repos

1. **Install Dependencies**:
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
   ```

2. **Vite Configuration**:
   Update `vite.config.ts` to include the `test` object:
   ```typescript
   /// <reference types="vitest" />
   export default defineConfig({
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: './src/test/setup.ts', // optional
     },
   })
   ```

3. **Package Scripts**:
   Add `"test": "vitest run"` and `"test:watch": "vitest"` to `package.json`.

4. **Husky Integration**:
   Ensure `.husky/pre-push` (or `pre-commit`) includes `npm run test`. Use LF line endings for compatibility.
