# Agentic Portfolio - Development Guidelines

**Navigation hub for project standards and processes.**

---

## 📋 Documentation Map

| Document | Purpose | Size |
|----------|---------|------|
| **[style.md](./style.md)** | Code formatting, naming, components | 142 lines |
| **[.claude/agents/research-agent.md](./. claude/agents/research-agent.md)** | Research process context | 26 lines |
| **[.claude/agents/reviewer-agent.md](./. claude/agents/reviewer-agent.md)** | Code review process context | 28 lines |
| **[.claude/rules/react-best-practices.md](./. claude/rules/react-best-practices.md)** | React standards & patterns | 48 lines |
| **[.claude/rules/typescript-standards.md](./. claude/rules/typescript-standards.md)** | TypeScript best practices | 44 lines |
| **[.claude/rules/performance.md](./. claude/rules/performance.md)** | Performance guidelines | 33 lines |
| **[.claude/skills/code-review.md](./. claude/skills/code-review.md)** | Code review checklist & process | 65 lines |
| **[.claude/skills/research.md](./. claude/skills/research.md)** | Research methodology | 42 lines |
| **[.claude/skills/testing.md](./. claude/skills/testing.md)** | Testing strategy & best practices | 47 lines |
| **[.claude/skills/documentation.md](./. claude/skills/documentation.md)** | Documentation standards | 56 lines |
| **[.claude/skills/optimization.md](./. claude/skills/optimization.md)** | Performance optimization process | 55 lines |
| **[.claude/skills/accessibility.md](./. claude/skills/accessibility.md)** | Accessibility standards & testing | 77 lines |

**Total**: ~800 lines (lean, focused context)

---

## ⚡ Core Rule

**No compiled files in src/** - Only `.tsx`/`.ts` files. Output goes to `dist/`. If `.js` files appear in src/, delete them and update build config.

---

## 🚀 Quick Start

```bash
npm install       # Install dependencies
npm run dev       # Start dev server
npm test          # Run tests
npm run build     # Build for production
```

---

## 📁 Project Structure

```
.claude/
├── agents/          # AI agent contexts
├── rules/           # Project standards
└── skills/          # Development processes

src/
├── components/sections/    # Page sections
├── components/common/      # Reusable components
├── components/layouts/     # Layout wrappers
├── hooks/                  # Custom hooks
├── utils/                  # Utilities
├── types/                  # TypeScript types
├── services/               # API calls
├── styles/                 # Global styles
└── constants/              # Constants
```

---

## ✅ Quality Standards

- TypeScript strict mode enabled
- 80%+ test coverage (critical paths)
- WCAG 2.1 Level AA accessibility
- No console errors/warnings
- No performance regressions
- Code reviewed before merge

---

## 🔗 Resources

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [WebAIM - Accessibility](https://webaim.org)
- [Web Vitals](https://web.dev/vitals)

---

**Last Updated**: 2026-04-22
