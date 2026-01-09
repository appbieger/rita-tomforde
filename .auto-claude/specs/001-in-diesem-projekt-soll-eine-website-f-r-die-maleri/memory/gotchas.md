# Gotchas & Pitfalls

Things to watch out for in this codebase.

## [2026-01-09 13:36]
npm and npx commands are blocked in the sandbox environment - build verification requires manual execution outside the sandbox

_Context: subtask-8-1: Run production build and verify output - Cannot execute npm run build due to sandbox command restrictions_
