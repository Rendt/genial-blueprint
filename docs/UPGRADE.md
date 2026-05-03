# 🛠️ Genial Standard Upgrade Guide
> **Version: 2-May-2026**
> **Purpose**: This guide provides a fail-safe instruction set for an AI Agent to upgrade an existing repository (e.g., `vibe-coder-os`, `video-architect`) to the **Genial Standard**.
> **Primacy Notice**: Specialized policies in `docs/policies/` override these instructions if a conflict arises.

## 🛑 Phase 0: Pre-Flight Check
Before modifying code, the agent MUST:
1. Verify the presence of `blueprint.json` in the root.
2. Read the mandatory anchor instructions in `docs/agent_instructions.md`.
3. Confirm the tech stack matches: **Vite + React + TypeScript + Tailwind**.

## 🏗️ Phase 1: Infrastructure Alignment
Execute these steps to standardize the build and environment:

### 1.1 Vite Configuration
- Backup the existing `vite.config.ts`.
- Replace its contents with a version derived from `config/vite.config.ts.standard`.
- **CRITICAL**: Ensure the `define` block for `__BUILD_NUMBER__` and `__BUILD_TIMESTAMP__` is included.

### 1.2 Quality Gates (Git Sync Policy)
- Install Git Sync dependencies: `npm install -D husky lint-staged`.
- Initialize husky: `npx husky install`.
- Add a pre-commit hook that runs `lint-staged` to enforce the quality gate before any push.

### 1.3 Tailwind Normalization
- Ensure `tailwind.config.ts` (or `.js`) includes the Genial Palette:
  ```json
  "colors": {
    "ocean": { "50": "#f0f9ff", "500": "#0ea5e9", "600": "#0284c7", "700": "#0369a1" },
    "slate": { "50": "#f8fafc", "200": "#e2e8f0", "800": "#1e293b", "900": "#0f172a" }
  }
  ```

### 1.3 Module Import Aliases
- Ensure `tsconfig.json` paths mapping matches the standardized structure:
  ```json
  "paths": {
    "@modules/*": ["./modules/*"],
    "@docs/*": ["./docs/*"]
  }
  ```

## 🧩 Phase 2: Core Module Migration
Replace existing ad-hoc components with Genial Standard modules to ensure cross-app consistency.

| Existing Component | Replacement Module | Benefit |
| :--- | :--- | :--- |
| Sidebar / Nav | `modules/Sidebar.tsx` | Mobile-ready, tiered, metadata support |
| Popups / Alerts | `modules/Modal.tsx` | Iframe-aware, no native dialogs |
| Notifications | `modules/toast.tsx` | Low-z-index, non-blocking |
| Auth Logic | `modules/auth.ts` | Adaptive OAuth discovery |

### Migration Steps:
1. **Copy** the module file from the Blueprint to the local `modules/` folder.
2. **Refactor** the main app entry (e.g., `App.tsx`) to use the new `Sidebar`.
3. **Scan** for `window.alert`, `window.confirm`, or `window.prompt` and replace with `Modal` or `Toast`.

## 📦 Phase 3: Metadata & Environment
1. **Add `blueprint.json`**: If missing, create it to let other agents discover this app's capabilities.
2. **Update Readme**: Add the "Genial Standard" badge and versioning link.
3. **Environment**: Replace hardcoded "v1.0.0" strings with `__BUILD_NUMBER__`.

## ✅ Phase 4: Verification
An upgrade is not complete until:
- [ ] `npm run build` succeeds.
- [ ] **Viewport Check**: All tables, debug logs, and large containers are verified to be scrollable and fit the viewport (No horizontal overflowing of the page).
- [ ] **No native dialogs**: No `alert()` or `prompt()` calls remain in any source file.
- [ ] **Sidebar Sync**: Sidebar collapses correctly and shows build metadata in the footer.
- [ ] **Git Sync**: Quality gates (pre-commit hooks) are active and blocking invalid commits.
- [ ] `docs/lessons.md` is updated with any repo-specific quirks encountered during the upgrade.

---
*For specific policy details, refer to [docs/policies/](docs/policies/)*
