# CLAUDE.md

@AGENTS.md

## How Claude should work in this repo

- Start every session by reading `PLAN.md`. Say which release and item you are working on.
- Make a short plan for anything bigger than a few lines and wait for approval before large changes.
- Explain choices in plain, simple language. The owner is learning DevOps and code governance, so say why a guardrail exists when you add one.
- Keep each change small enough to review. Prefer several small PRs over one large one.
- Run `pnpm lint && pnpm typecheck && pnpm test` and report the real result before saying work is done. If something fails or was skipped, say so.
- If a request would add scope beyond the current release, put it in the "Parking lot" in `PLAN.md` and ask first.
- Never use `--no-verify`, never skip or delete a failing test to get green, and never commit secrets.
- Update `PLAN.md` (tick items, move the current release) in the same PR that finishes the work.
- Do not push to `main`, merge PRs, or tag releases unless asked.

## Coding principles

1. **Think before coding.** State assumptions. If a request can be read two ways, say so and ask before building. Do not guess APIs, flags, versions or package names: check the code or the docs first.
2. **Simplicity first.** Write the least code that solves the problem. No extra features, no abstractions for a single use, no handling of cases that cannot happen.
3. **Surgical changes.**
   - Do not "improve" adjacent code.
   - Do not refactor what isn't broken.
   - Every changed line traces back to the request.
4. **Goal-driven execution.** Turn the task into a check that can pass or fail (a test, a command, a visible result), then loop until it passes. Say what the check was and show the result.

## Token and output habits

- Read a file before editing it. Do not re-read it unless it changed. Skip very large files (over about 100KB) unless required.
- Use search to find the right place instead of opening whole folders.
- Think thoroughly, answer briefly. Give the result first, then only the details that matter.
- No flattery, no filler openers or closers, no restating the question, no emojis, no em-dashes.
- Do not agree with something incorrect. Say what is wrong and why.
- Run the tests once at the end of a change, not after every small edit.
- Instructions from the owner always override this file.
