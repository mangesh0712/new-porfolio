# Documentation Skill

## Overview
Create clear, maintainable documentation that helps developers understand, use, and contribute to the codebase.

## Documentation Types

### README
Primary entry point for the project.

**Sections**:
- Project description
- Features
- Prerequisites
- Installation
- Quick start
- Configuration
- Usage examples
- API documentation
- Testing
- Contributing
- License
- Troubleshooting

---

### Component Documentation
Explain how to use components.

```tsx
/**
 * Button Component
 * 
 * A customizable button component supporting multiple variants.
 * 
 * @component
 * @example
 * const onClick = () => console.log('clicked');
 * return <Button variant="primary" onClick={onClick}>Click me</Button>
 */
interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Click handler */
  onClick?: () => void;
  /** Whether button is disabled */
  disabled?: boolean;
  /** Optional CSS class */
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  className
}) => {
  // Implementation
};
```

---

### Hook Documentation
Explain how to use custom hooks.

```tsx
/**
 * useLocalStorage
 * 
 * Syncs state with browser localStorage.
 * 
 * @param key - The localStorage key
 * @param initialValue - Default value if not in storage
 * @returns [value, setValue] - Current value and setter
 * 
 * @example
 * const [name, setName] = useLocalStorage('userName', 'Anonymous');
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Implementation
}
```

---

### API Documentation
Document API endpoints and responses.

```markdown
## GET /api/users/:id

Fetch a user by ID.

### Parameters
- `id` (string, required): User ID

### Response
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

### Errors
- `404`: User not found
- `401`: Unauthorized
```

---

### Architecture Documentation
Explain system design and decisions.

```markdown
## Architecture Overview

### Component Hierarchy
- App
  - Header
  - Layout
    - Sidebar
    - MainContent
      - Router
        - PageComponents

### Data Flow
1. User interaction triggers event
2. State updates via hooks
3. Components re-render
4. Side effects run in useEffect

### State Management
- Local component state for UI
- Context for theme/locale
- Query client for server state
```

---

## Documentation Best Practices

### Keep It Up-to-Date
- Update docs when code changes
- Link to current implementation
- Remove outdated examples
- Version-specific notes

---

### Use Examples
Show how to use code with real examples.

```tsx
// Good - Clear example
const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>Count: {count}</button>

// Bad - No example
const [count, setCount] = useState(0);
// Use this to track things
```

---

### Document Decisions
Explain WHY decisions were made.

```markdown
## Why We Use React Query

**Decision**: Use React Query for server state management.

**Rationale**:
- Simplifies caching logic
- Handles background sync
- Provides offline support
- Reduces boilerplate

**Trade-offs**:
- Additional dependency
- Learning curve for team
- Slightly larger bundle
```

---

### Use Clear Headings
Organize with hierarchical headings.

```markdown
# Project Name        (H1 - Main title)
## Feature Name       (H2 - Major sections)
### Configuration     (H3 - Subsections)
#### Advanced Usage   (H4 - Details)
```

---

## Documentation Checklist

- [ ] Project has a README
- [ ] Installation steps are clear
- [ ] Examples are provided
- [ ] Configuration options documented
- [ ] Common errors explained
- [ ] Contributing guidelines exist
- [ ] Components documented
- [ ] Hooks documented
- [ ] API documented
- [ ] Architecture explained
- [ ] Links are not broken
- [ ] Code examples are tested

---

## Tools

**Documentation Generators**:
- TypeDoc - TypeScript documentation
- Storybook - Component documentation
- JSDoc - JavaScript documentation

**Writing Tools**:
- Markdown - Simple format
- MDX - Markdown with JSX
- Docusaurus - Documentation site
