# AGENTS.md: rules for anyone coding in Kanri

Kanri is a personal issue tracker (Jira-style) with an automation engine. It is built to be
finished: small releases, boring tech, no scope creep. Read `PLAN.md` first to see the current
release and what is in or out of scope.

## Working agreement

1. Work only on the current release in `PLAN.md`. Ideas for later go to the "Parking lot" in `PLAN.md`, not into code.
2. Small steps. One branch and one pull request per change, ideally under 400 changed lines.
3. Never commit to `main`. Branch names: `feat/...`, `fix/...`, `chore/...`, `docs/...`.
4. Before opening a PR: `pnpm lint && pnpm typecheck && pnpm test` must pass.
5. A release is done only when its "Done when" check in `PLAN.md` is true. Then tag it and update the changelog.
6. When a big decision is made (a library, a data model change), add a short note in `docs/adr/`.
7. Ask before adding a new dependency. Prefer what is already installed.

## Stack

- Monorepo with pnpm workspaces: `apps/web`, `apps/api`, `apps/worker` (from v1.1), `packages/shared`, `infra/`, `docs/adr/`.
- Web: React + TypeScript (Vite). API: NestJS. Database: PostgreSQL. Queue: Redis + BullMQ.
- Node 22 (see `.nvmrc`), pnpm via corepack.
- TypeScript is pinned to 6.x because typescript-eslint does not support 7 yet. Do not upgrade it until it does.

## Commands

| Task            | Command                     |
| --------------- | --------------------------- |
| Install         | `pnpm install`              |
| Run web and API | `pnpm dev`                  |
| Lint / format   | `pnpm lint` / `pnpm format` |
| Type check      | `pnpm typecheck`            |
| Test            | `pnpm test`                 |
| Build           | `pnpm build`                |

## Code style

- TypeScript `strict` everywhere. No `any`; use `unknown` and narrow it. No `// @ts-ignore`.
- Prettier and ESLint decide formatting. Do not argue with them, run `pnpm format`.
- Names: `camelCase` for variables and functions, `PascalCase` for types, classes and React components, `kebab-case` for file names, `snake_case` for database tables and columns.
- Types shared by web and API live in `packages/shared`. Never copy a type between apps.
- Validate all input at the edge of the API (DTOs with validation). Trust nothing from the client.
- Keep functions small and files focused. A comment explains why, not what.
- Prefer clear code over clever code. Do not add abstractions for a second use that does not exist yet.

## API and data rules

- Routes live under `/api`. Use plural nouns and standard verbs: `GET /api/projects`, `POST /api/issues`.
- Database changes go through migrations only, never by hand. Each migration is small and has a clear name.
- Every issue change writes an append-only `issue_event` row in the same transaction. Never edit or delete events. Automation depends on this.
- Statuses are rows (`workflow_status`), never a hard-coded list.
- Never log passwords, tokens or full request bodies. Secrets come from environment variables, never from code. Keep `.env.example` current.

## Testing

- Every new endpoint gets at least one API test (happy path plus one failure).
- Every bug fix starts with a test that fails, then the fix.
- Test behavior, not implementation details. No tests that only repeat the code.

## Git and commits

- Conventional Commits, enforced by commitlint: `feat(api): add issue creation`, `fix(web): board card flicker`, `chore: bump deps`.
- Allowed types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert.
- Hooks run automatically (Husky): lint-staged and a secret scan on commit, commit message check on commit. Do not bypass them with `--no-verify`.
- PRs use the template in `.github/` and must link the `PLAN.md` item they finish.

## Security basics

- Hash passwords with argon2 or bcrypt. Never store them in plain text.
- No secrets in git. If one leaks, rotate it first, then clean up.
- Keep dependencies updated (Renovate from v0.3) and fix scanner findings from v1.1 on.
