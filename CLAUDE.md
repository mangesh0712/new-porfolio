# Agentic Portfolio - Development Guidelines

This document serves as the main index for project guidelines. See linked subdocuments for detailed information.

## Quick Reference

- **Style Guide**: See [style.md](./style.md) for code formatting, naming conventions, and component structure
- **Rules**: See [.claude/rules/](./. claude/rules/) for best practices and standards
- **Skills**: See [.claude/skills/](./. claude/skills/) for development capabilities and processes
- **Agents**: See [.claude/agents/](./. claude/agents/) for specialized AI agents

---

## Project Overview

Agentic Portfolio is a modern React/TypeScript application showcasing portfolio features with intelligent AI agents for research and code review.

**Tech Stack**:
- React 19
- TypeScript
- Tailwind CSS
- Vite
- Node.js

---

## Core Rules

### No Compiled Files in Source Directories

**Rule:** Source directories (`src/`) must contain ONLY source files (`.tsx`, `.ts`). Compiled JavaScript files (`.js`) should never be committed alongside source files.

**Impact:**
- Confusion about source of truth is eliminated
- Repository stays clean (no build artifacts)
- Git diffs show only meaningful changes
- Developers see actual source code

**Implementation:**
- Keep only `.tsx` / `.ts` files in `src/`
- Compiled output goes to `dist/` directory
- Add `.js` files in `src/` to `.gitignore` if generated there
- Ensure build configuration outputs to correct directory

---

## Development Workflow

### 1. Planning
- Understand requirements clearly
- Check existing code and patterns
- Plan approach before coding

### 2. Implementation
- Follow rules in [.claude/rules/](./. claude/rules/)
- Match style guide in [style.md](./style.md)
- Write tests as you go

### 3. Review
- Use Reviewer Agent to validate changes
- Check against code review checklist
- Ensure all tests pass

### 4. Documentation
- Update README if needed
- Add comments only for non-obvious logic
- Keep documentation in sync with code

---

## Available Agents

### Research Agent
**Purpose**: Investigate and explore new technologies, patterns, and best practices.

**Use when**:
- Evaluating new libraries or frameworks
- Researching performance optimization
- Exploring design patterns
- Investigating accessibility requirements

See [.claude/agents/research-agent.md](./. claude/agents/research-agent.md)

---

### Reviewer Agent
**Purpose**: Review and validate code changes against project standards.

**Use when**:
- Submitting code for review
- Implementing architectural changes
- Making significant refactors
- Updating dependencies

See [.claude/agents/reviewer-agent.md](./. claude/agents/reviewer-agent.md)

---

## Development Skills

### Code Review
Comprehensive review process ensuring quality and adherence to standards.
- Correctness and logic verification
- Type safety checking
- Performance analysis
- Security review

See [.claude/skills/code-review.md](./. claude/skills/code-review.md)

---

### Research
Systematic investigation and decision-making for technology choices.
- Information gathering
- Option analysis
- Recommendation with trade-offs
- Implementation guidance

See [.claude/skills/research.md](./. claude/skills/research.md)

---

### Testing
Comprehensive testing strategy for reliability and maintainability.
- Unit testing
- Integration testing
- E2E testing
- Best practices

See [.claude/skills/testing.md](./. claude/skills/testing.md)

---

### Documentation
Clear, maintainable documentation for understanding and contributing.
- Component documentation
- API documentation
- Architecture documentation
- README standards

See [.claude/skills/documentation.md](./. claude/skills/documentation.md)

---

### Optimization
Identify and eliminate performance bottlenecks.
- Bundle size optimization
- Component performance
- Network optimization
- Rendering performance

See [.claude/skills/optimization.md](./. claude/skills/optimization.md)

---

### Accessibility
Ensure application usability for all users.
- WCAG compliance
- Keyboard navigation
- Screen reader support
- Semantic HTML

See [.claude/skills/accessibility.md](./. claude/skills/accessibility.md)

---

## Best Practices

### React Best Practices
- Functional components only (with hooks)
- Single responsibility per component
- Explicit TypeScript typing
- Proper dependency arrays
- Stable keys in lists
- Local state management
- Immutable state updates
- Memoization when needed

See [.claude/rules/react-best-practices.md](./. claude/rules/react-best-practices.md)

---

### TypeScript Standards
- Strict type checking enabled
- No `any` types
- Explicit return types
- Utility types for DRY code
- Generics for reusability
- Proper null/undefined handling

See [.claude/rules/typescript-standards.md](./. claude/rules/typescript-standards.md)

---

### Performance Rules
- Minimize unnecessary re-renders
- Lazy load components
- Virtualize long lists
- Tree-shake unused code
- Memoize expensive calculations
- Separate state by frequency
- Optimize assets

See [.claude/rules/performance.md](./. claude/rules/performance.md)

---

## Style Guide

Detailed style guide covering:
- Code formatting and indentation
- Variable and component naming
- Import organization
- Function declaration style
- Component structure
- CSS classes and Tailwind
- TypeScript conventions
- Comments philosophy
- File organization
- Git commit messages

See [style.md](./style.md)

---

## Common Tasks

### Adding a New Component
1. Create component file in appropriate directory (`sections/`, `common/`, or `layouts/`)
2. Define TypeScript interface for props
3. Implement functional component
4. Add JSDoc comments if complex
5. Write tests
6. Document usage

### Fixing a Bug
1. Write test that reproduces the bug
2. Fix the implementation
3. Verify test passes
4. Check for similar patterns elsewhere
5. Update documentation if needed

### Performance Optimization
1. Measure baseline with DevTools Profiler
2. Identify bottleneck
3. Apply specific technique
4. Measure improvement
5. Verify no regressions

### Refactoring
1. Ensure full test coverage
2. Make changes incrementally
3. Verify tests pass after each change
4. Commit in logical chunks
5. Update documentation

---

## Testing Requirements

- Critical business logic: 100% coverage
- Component rendering: 80%+ coverage
- Utility functions: 80%+ coverage
- Happy path and error cases tested
- Accessibility tested

---

## Quality Standards

✅ **Code must be**:
- Type-safe (TypeScript strict mode)
- Accessible (WCAG 2.1 Level AA minimum)
- Well-tested (appropriate coverage)
- Well-documented (when non-obvious)
- Performant (no unnecessary re-renders)
- Reviewed (before merge)

---

## Git Workflow

1. Create feature branch from `main`
2. Make changes following style guide
3. Write/update tests
4. Use Reviewer Agent for validation
5. Commit with descriptive message
6. Create pull request
7. Address feedback
8. Merge when approved

---

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [WebAIM Accessibility](https://webaim.org)
- [Web Vitals](https://web.dev/vitals)
- [MDN Web Docs](https://developer.mozilla.org)

---

## Getting Started

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Run tests: `npm test`
4. Build for production: `npm run build`
5. Review [style.md](./style.md) for coding standards
6. Check [.claude/rules/](./. claude/rules/) for best practices

---

## Questions?

For help with:
- **Coding standards**: Check [style.md](./style.md)
- **React patterns**: See [.claude/rules/react-best-practices.md](./. claude/rules/react-best-practices.md)
- **TypeScript**: See [.claude/rules/typescript-standards.md](./. claude/rules/typescript-standards.md)
- **Performance**: See [.claude/rules/performance.md](./. claude/rules/performance.md)
- **Development skills**: Check [.claude/skills/](./. claude/skills/)
- **Agents**: See [.claude/agents/](./. claude/agents/)
