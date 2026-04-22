# Agentic Portfolio - Development Guidelines

Navigation hub for project standards and processes.

---

## 📋 Documentation Map

| Document | Purpose |
|----------|---------|
| **[style.md](./style.md)** | Code formatting, naming, components |
| **[.claude/agents/research-agent.md](./. claude/agents/research-agent.md)** | Research process |
| **[.claude/agents/reviewer-agent.md](./. claude/agents/reviewer-agent.md)** | Code review process |
| **[.claude/rules/react-best-practices.md](./. claude/rules/react-best-practices.md)** | React standards |
| **[.claude/rules/typescript-standards.md](./. claude/rules/typescript-standards.md)** | TypeScript rules |
| **[.claude/rules/performance.md](./. claude/rules/performance.md)** | Performance guidelines |
| **[.claude/skills/code-review.md](./. claude/skills/code-review.md)** | Code review checklist |
| **[.claude/skills/research.md](./. claude/skills/research.md)** | Research methodology |
| **[.claude/skills/testing.md](./. claude/skills/testing.md)** | Testing strategy |
| **[.claude/skills/documentation.md](./. claude/skills/documentation.md)** | Documentation standards |
| **[.claude/skills/optimization.md](./. claude/skills/optimization.md)** | Optimization process |
| **[.claude/skills/accessibility.md](./. claude/skills/accessibility.md)** | A11y standards |
| **[.claude/PROMPTING_GUIDE.md](./. claude/PROMPTING_GUIDE.md)** | How to use these docs in prompts |

---

## ⚡ Core Rules

**No compiled files in src/** - Only `.tsx`/`.ts` files. Output → `dist/`.

**MD files stay minimal** - Only specific information, no verbose explanations. Keep productive, not bulky.

---

## 📁 Project Structure

```
.claude/
├── agents/
├── rules/
└── skills/

src/
├── components/sections/
├── components/common/
├── components/layouts/
├── hooks/
├── utils/
├── types/
├── services/
├── styles/
└── constants/
```

---

## 🚀 Quick Commands

```bash
npm install       # Install
npm run dev       # Dev server
npm test          # Tests
npm run build     # Build
```

---

## ✅ Standards

- TypeScript strict mode
- 80%+ test coverage (critical paths)
- WCAG 2.1 Level AA
- No console errors
- Code reviewed before merge

---

**Last Updated**: 2026-04-22
