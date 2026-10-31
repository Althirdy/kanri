# PLAN.md: Kanri roadmap

Goal: finish v1.0 (about 5 weeks), a personal issue tracker running on my own server. Everything
after v1.0 is a bonus. Full plan:
https://claude.ai/artifact/AhKpMMrCBVLbMkrMogv4n8

## Current release

**v0.1 Guardrails** (week 1)

Done when: a PR with a bad commit message or a fake secret is blocked, and the CI badge is green.

- [x] Monorepo skeleton (web, api, shared)
- [ ] ESLint, Prettier, EditorConfig
- [ ] Husky hooks, lint-staged, commitlint
- [ ] Build, lint, typecheck and tests all pass locally
- [ ] GitHub Actions CI on every PR (lint, typecheck, test, build, gitleaks)
- [ ] PR template and CODEOWNERS
- [ ] Branch protection on `main` (PRs only, CI must pass)
- [ ] README with setup steps and the v1.0 finish line
- [ ] Tag `v0.1.0`

## Next releases

| Release         | Weeks | Scope                                                                                                                 | Done when                                                                                   |
| --------------- | ----- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| v0.2 Projects   | 1     | Login, create and list projects with a key. Dockerfiles, Compose on the server, migrations in CI                      | I log in from my laptop to the server and create project `SIDE`                             |
| v0.3 Issues     | 1     | Issues with keys, status, priority, due date, list view, activity history from `issue_event`. Coverage gate, Renovate | I track this project's own work in Kanri from here on                                       |
| v1.0 Board      | 2     | Kanban board with drag and drop, custom statuses, search. Release on tag, changelog, nightly backup                   | Tagging `v1.0.0` publishes images and one command updates the server; used daily for a week |
| v1.1 Automation | 2     | Worker, rules screen, run log. Semgrep and Trivy in CI                                                                | A rule "when status moves to Done, post to my webhook" fires and shows in the run log       |
| v1.2 Observe    | 1-2   | Rule and queue metrics. Prometheus, Grafana, Loki                                                                     | A dashboard shows rule runs and a failed run sends an alert                                 |

## Rules for the plan

- No extras before v1.0.
- If a release runs past 2 weeks, cut scope and tag what works. Never extend time.
- Every release ends with a tag and a short changelog entry.
- Work data: check company rules before putting real work issues on a personal server.

## Decisions made

- App name: Kanri.
- NestJS for the API, so the whole app is TypeScript.
- pnpm monorepo, Node 22, TypeScript 6.x (typescript-eslint does not support 7 yet).

## Open decisions

- [ ] GitHub repo (name `kanri`, public or private)
- [ ] Self-hosted Git later (Forgejo) or stay on GitHub

## Parking lot (ideas for after v1.0)

Labels and comments, "my week" view, scheduled triggers, GitHub integration (link commits to
issues), sprints, API tokens and CLI, teams and roles, k3s + Helm + Argo CD, SBOM and signed
images, OpenTelemetry tracing.
