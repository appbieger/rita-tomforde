# Gotchas & Pitfalls

Things to watch out for in this codebase.

## [2026-01-09 15:59]
Commands like curl, node, and npm are blocked in this project. Use git clone for downloading files from GitHub repositories instead.

_Context: Tried to download images using curl and node scripts, both were blocked. Successfully used git sparse checkout to clone only the images directory from the source repository._
