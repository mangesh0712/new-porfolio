# Agentic Portfolio - Development Guidelines

## Folder Structure Rules

### No Compiled Files in Source Directories

**Rule:** Source directories (`src/`) must contain ONLY source files (`.tsx`, `.ts`). Compiled JavaScript files (`.js`) should never be committed alongside source files.

**Why:** 
- Creates confusion about which file is the source of truth
- Bloats the repository with generated artifacts
- Defeats the purpose of version control (tracking human changes, not build outputs)
- Makes it harder to identify actual source code changes in diffs and git history
- Can lead to stale compiled files being used instead of the latest source

**How to apply:**
- Keep only `.tsx` / `.ts` files in `src/components/`, `src/utils/`, etc.
- Compiled `.js` files belong in `dist/` or `build/` directories (generated at build time, not committed)
- If you find `.js` files alongside `.tsx` files, delete the `.js` files and ensure your build configuration outputs to the correct directory
- Add `.js` files in `src/` to `.gitignore` if they're being generated there accidentally

**Build Configuration:**
- TypeScript compiler or bundler (Webpack, Vite, etc.) should handle transpilation
- Output should go to a separate `dist/` or `build/` directory, never to `src/`
