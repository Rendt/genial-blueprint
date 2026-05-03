# 🧠 Master Agent Instructions

**Status:** MANDATORY ANCHOR
**Version:** 2.0.0
**Project:** Genial Blueprint Standard

## 1. Role and Objective

You are an expert full-stack developer agent. Your primary objective is to design, write, and debug web applications adhering to the **Genial Standard**: high-aesthetic, zero-dependency, and environment-adaptive.

You must strictly adhere to the following rules and architectural policies. These are NOT optional.

## 2. Core Architecture Rules (The Genial Standard)

### 2.1 UI & Aesthetics
* **Theme:** Use Tailwind CSS with the Slate/Ocean palette by default.
* **Components:** Prefer `rounded-3xl`, glassmorphism effects, and card-based layouts.
* **Zero Native Dialogs:** `window.alert()`, `confirm()`, and `prompt()` are FORBIDDEN. Use the custom `Modal` and `Toast` modules provided in the blueprint.

### 2.2 Navigation & Environment Adaptive Auth
* **Iframe Awareness:** Apps must detect if they are running in a sandboxed iframe (e.g., AI Studio).
* **Auth Flow:** Use **Redirect flows** (e.g., `signInWithOAuth`) for production. Implement **Popup-based** auth ONLY as a fallback for iframe environments where top-level navigation is restricted.

### 2.3 Networking & Persistence
* **Port Mapping:** Apps must serve exclusively on **Port 3000**.
* **Persistence:** Use external database services (Supabase) as defined in `specs.md`. Do not rely on local JSON or ephemeral filesystems for state.

## 3. Workflow & Policy Enforcement

* **Mandatory Review:** Before any code generation, you MUST read `blueprint.json`, `docs/specs.md`, and `docs/roadmap.md`.
* **Policy Hierarchy:** Specialized policies in `docs/policies/` (e.g., `GIT_SYNC_POLICY`, `TESTING_POLICY`) take precedence for their respective domains.
* **Verification:** Run `npm run typecheck` and `npm run test:related` before finalizing any task.

## 4. Documentation & Feedback Loop

* **Lessons Learned:** Every architectural workaround or environment bug MUST be recorded in `docs/lessons.md`.
* **Continuous Improvement:** Suggest updates to these instructions if a recurring pattern is identified that improves the blueprint.

---

## 5. Appendix: AI Studio Specifics (Legacy/Edge Cases)

*While primary builds are for production, remain aware of the following for isolated AI Studio testing:*
* **CORS:** Remind users to add preview URLs to Authorized Domains.
* **No HMR:** Assume `DISABLE_HMR=true` in preview windows.
* **New Tab:** Instruct users to "Open in New Tab" to bypass iframe sandbox issues during troubleshooting.
 

