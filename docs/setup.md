# App Scaffolding Setup (Genial Standard)

*This guide ensures efficient, zero-regression initialization from the `genial-blueprint` repository.*

## 🏃 Initialization Sequence

1. **Scaffold Root**: Copy `config/package.json.standard` to root as `package.json`.
2. **Infrastructure**: Copy `config/*.standard` to root (rename to remove `.standard`).
3. **Source Setup**:
   - Create `src/` and `src/test/` directories.
   - Copy `templates/App.tsx.template` to `src/App.tsx`.
   - Copy `config/test_setup.ts.standard` to `src/test/setup.ts`.
   - Create `src/main.tsx` importing `App.tsx` and `../modules/index.css`.
4. **Tailwind Config**: Run `npx tailwindcss init -p` and ensure `content` includes `modules/*.tsx` and `src/**/*.{ts,tsx}`.
5. **Agent Alignment**: Ensure the local `.clinerules` or agent config points to `docs/agent_instructions.md`.

## 🤖 Mandatory Constraints

- **Env Sync**: When adding variables to `.env.local`, immediately update the `env` key in `vercel.json`.
- **Quality Gates**: `npm run test:related` must pass before any feature is considered "Turn 3 complete."
- **Feedback**: Post-implementation lessons MUST be recorded in `docs/lessons.md`.
