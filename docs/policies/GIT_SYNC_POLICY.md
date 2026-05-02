# Git & Sync Policy (GIT_SYNC_POLICY)

**Version:** 1.0.0
**Date:** 2026-05-02
**Status:** Active

## Version History
- **1.0.0 (2026-05-02):** Initial version. Established `lint-staged` protocol with `test:related` and `lint` gates. Defined sync and merge protocols.

---

## 1. Quality Gates (The "Staged" Protocol)

To maintain a high-velocity, low-regression codebase, the project utilizes `husky` and `lint-staged`.

### 1.1 Pre-Commit Requirements
All changes must pass automated checks before a commit is accepted.
- **Scope:** Only staged files (`.ts`, `.tsx`).
- **Commands:**
    1. `npm run test:related`: Executes Vitest only for tests affected by staged changes.
    2. `npm run lint`: Runs `tsc --noEmit` to ensure type safety.

### 1.2 Development Sandbox
- **Local Testing:** Run `npm run test` or `npm run test:watch` during active development to catch logic errors before the commit stage.
- **Build Verification:** While actual building happens in CI/CD, developers should occasionally run `npm run build` locally to verify bundling integrity, especially after updating `vite.config.ts` or large dependencies.

---

## 2. Sync & Merge Protocols

### 2.1 Branch Management
- **Main Branch:** The `main` branch is the source of truth and should always be deployable.
- **Feature Branches:** Use short-lived feature branches for significant architectural changes.
- **Commits:** Use descriptive, imperative commit messages (e.g., `feat: add task recurrence`, `fix: toast alignment`).

### 2.2 Synchronization (Supabase & Google)
- **Schema Changes:** Any change to `supabase_schema.sql` must be committed and communicated.
- **Google Tasks Sync:** Use the `DebugModal` or `DebugView` diagnostic tools to verify sync state before and after major logic changes to `services/googleTasksSync.ts`.

---

## 3. Deployment Safety

### 3.1 Push Strategy
- **Standard Push:** `git push origin main`
- **Fast-Fix (Emergency only):** `git push origin main --no-verify` (Use only when the quality gate itself is broken and needs a remote fix).

### 3.2 CI/CD Alignment
- **Vercel/GitHub Actions:** Ensure that the local `npm run build` output matches the expectations of the deployment environment. If environmental issues arise (e.g., Worker timeouts), update `vite.config.ts` with stable pool settings (e.g., `vmThreads`).
