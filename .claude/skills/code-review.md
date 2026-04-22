# Code Review Skill

## Overview
Comprehensive code review to ensure quality, maintainability, correctness, and adherence to project standards.

## Checklist Items

### Correctness
- [ ] Code logic is correct and handles edge cases
- [ ] No off-by-one errors in loops
- [ ] Proper error handling
- [ ] No memory leaks
- [ ] Async operations are properly handled
- [ ] Promise chains are correct
- [ ] Callback hell is avoided

### Type Safety
- [ ] All variables have explicit types
- [ ] No use of `any` type
- [ ] Proper generic types used
- [ ] React component props are properly typed
- [ ] Return types are explicit
- [ ] Null/undefined handling is explicit

### Performance
- [ ] No unnecessary re-renders in React components
- [ ] Proper use of memoization (React.memo, useMemo, useCallback)
- [ ] Dependencies arrays are complete
- [ ] No N+1 query patterns
- [ ] No blocking operations on main thread
- [ ] Proper lazy loading implemented

### React Patterns
- [ ] Using functional components with hooks
- [ ] Proper hook dependencies
- [ ] Key prop used correctly in lists
- [ ] State is local when possible
- [ ] Props are immutable
- [ ] Custom hooks are used for logic reuse
- [ ] No hook calls in loops or conditions

### Testing
- [ ] Critical paths are tested
- [ ] Error cases are tested
- [ ] No flaky or brittle tests
- [ ] Tests use proper assertions
- [ ] Test coverage is adequate (70%+ for critical paths)

### Security
- [ ] No hardcoded secrets or credentials
- [ ] Proper input validation
- [ ] XSS protection implemented
- [ ] CSRF tokens used where needed
- [ ] SQL injection protection (if applicable)
- [ ] Dependencies are up to date
- [ ] No known vulnerabilities

### Accessibility
- [ ] Semantic HTML is used
- [ ] ARIA labels are present where needed
- [ ] Keyboard navigation works
- [ ] Color contrast is sufficient
- [ ] Focus management is correct
- [ ] Screen reader friendly

### Code Quality
- [ ] Code is readable and well-named
- [ ] No commented-out code
- [ ] No console.log statements
- [ ] No debugger statements
- [ ] Functions are focused (single responsibility)
- [ ] DRY principle followed
- [ ] No unnecessary complexity

### Documentation
- [ ] Complex logic is documented
- [ ] Props are documented (types serve as primary docs)
- [ ] API contracts are clear
- [ ] README updated if needed
- [ ] Deployment notes updated if needed

---

## Output Format

Start with a summary:
```
✅ Approved / 🚧 Changes Requested / ❌ Blocked

Changes reviewed: [number] files, [number] lines
Issues found: [number]
```

Then for each issue:
```
**Issue**: [Clear description]
**Severity**: critical | high | medium | low
**Location**: [file:line]
**Suggestion**: [How to fix]
```

End with:
```
**Summary**
- What was done well
- Main concerns
- Next steps
```
