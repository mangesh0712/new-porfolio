# Style Guide - Agentic Portfolio

## Code Style

### Formatting
- **Indentation**: 2 spaces
- **Line Length**: Max 100 characters (soft limit, 120 hard limit)
- **Quotes**: Single quotes for strings, double quotes for JSX attributes
- **Semicolons**: Always use semicolons
- **Trailing Commas**: Use trailing commas in multiline objects/arrays

```typescript
// ✅ Good
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
};

const names = [
  'Alice',
  'Bob',
  'Charlie',
];

// ❌ Bad
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
}

const names = ['Alice', 'Bob', 'Charlie']
```

---

### Variable Naming
- **Constants**: UPPER_SNAKE_CASE (only for truly constant values)
- **Variables/Functions**: camelCase
- **Components**: PascalCase
- **Files**: Match export name (Component.tsx for components, utils.ts for utilities)

```typescript
// ✅ Good
const API_BASE_URL = 'https://api.example.com';
const maxRetries = 3;
const handleSubmit = () => {};

const UserProfile = () => {};
// File: UserProfile.tsx

const formatDate = () => {};
// File: formatDate.ts

// ❌ Bad
const api_base_url = 'https://api.example.com';
const MAX_RETRIES = 3;
const HandleSubmit = () => {};
```

---

### Imports
- Group imports: External → Internal → Types
- Sort alphabetically within groups
- Use absolute imports (no relative paths beyond parent)

```typescript
// ✅ Good
import React, { useState } from 'react';
import { Button } from 'react-ui';

import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/sections/Header';
import { User } from '@/types/user';

// ❌ Bad
import { User } from '@/types/user';
import { Button } from 'react-ui';
import { useAuth } from '@/hooks/useAuth';
import React, { useState } from 'react';
import { Header } from '../components/sections/Header';
```

---

### Function Declaration
- Use arrow functions for callbacks and exports
- Use regular functions for complex logic (optional)
- Always specify return type

```typescript
// ✅ Good - arrow function with return type
const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ✅ Good - regular function with return type
function processData(data: Data): ProcessedData {
  // Complex logic
  return processed;
}

// ❌ Bad - no return type
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};
```

---

## Component Style

### Component Structure
1. Props interface
2. Component function
3. Styles (if CSS-in-JS)
4. Export

```tsx
interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
```

---

### Component Organization
```tsx
// 1. Imports
import React, { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Types/Interfaces
interface Props {
  initialValue?: string;
}

// 3. Component
const MyComponent: React.FC<Props> = ({ initialValue = '' }) => {
  // 3a. Hooks
  const [value, setValue] = useState(initialValue);
  const { data } = useQuery(['data'], fetchData);
  
  // 3b. Event handlers
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  
  // 3c. Effects
  useEffect(() => {
    // side effect
  }, [value]);
  
  // 3d. Render
  return <div>{value}</div>;
};

// 4. Export
export default MyComponent;
```

---

## Styling

### CSS Classes
- Use kebab-case for class names
- BEM methodology (Block__Element--Modifier) for complex components

```tsx
// ✅ Good
<div className="card">
  <h3 className="card__title">Title</h3>
  <p className="card__description">Description</p>
  <button className="card__button card__button--primary">
    Action
  </button>
</div>

// Stylesheet
.card {
  padding: 16px;
  border: 1px solid #ccc;
}

.card__title {
  font-size: 20px;
  font-weight: bold;
}

.card__button--primary {
  background-color: blue;
}

.card__button--primary:hover {
  background-color: darkblue;
}
```

---

### Tailwind Classes
- Use Tailwind utility classes
- Avoid creating custom classes for Tailwind components
- Group related utilities logically

```tsx
// ✅ Good
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h3 className="text-lg font-semibold text-gray-900">Title</h3>
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
    Action
  </button>
</div>
```

---

## TypeScript Style

### Type Definitions
```typescript
// ✅ Good - interface for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Good - type for unions/primitives
type Status = 'pending' | 'success' | 'error';

// ✅ Good - generic interface
interface List<T> {
  items: T[];
  total: number;
}
```

---

### Null/Undefined Handling
```typescript
// ✅ Good - explicit type
const userName: string | null = getUserName();
const port: number = process.env.PORT ?? 3000;

// ✅ Good - optional chaining
const email = user?.profile?.email;

// ❌ Bad - implicit optional
const userName = getUserName();
```

---

## Comments

### When to Comment
- Complex business logic
- Non-obvious design decisions
- Workarounds for bugs or browser issues
- Performance-critical sections

```typescript
// ✅ Good - explains WHY
// We can't use destructuring here because React DevTools
// has trouble showing component names with arrow functions
const Component = function MyComponent() {
  // ...
};

// ✅ Good - explains complex logic
// Sort users by last login, with active users first
const sortedUsers = users.sort((a, b) => {
  if (a.isActive !== b.isActive) {
    return a.isActive ? -1 : 1;
  }
  return b.lastLogin - a.lastLogin;
});

// ❌ Bad - obvious code
// Create a new array
const items = [];

// ❌ Bad - updates with code
// Add user to list (use git history instead)
users.push(newUser);
```

---

## File Organization

```
src/
├── components/
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx
│   │   └── Features.tsx
│   ├── common/             # Reusable components
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   └── layouts/            # Layout components
│       └── MainLayout.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useLocalStorage.ts
├── utils/
│   ├── formatDate.ts
│   └── calculateTotal.ts
├── types/
│   ├── user.ts
│   └── api.ts
├── services/
│   └── api.ts
├── styles/
│   ├── globals.css
│   └── variables.css
├── constants/
│   └── config.ts
└── App.tsx
```

---

## Git Commit Messages

### Format
```
type(scope): brief description

Optional detailed explanation if needed.

Fixes #123
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `style`: Code style changes
- `docs`: Documentation
- `test`: Test additions/changes
- `chore`: Maintenance tasks

### Examples
```
feat(auth): add login form component

Added LoginForm component with email/password validation
and proper error handling.

feat(api): implement user endpoints
fix(button): fix disabled state styling
refactor(utils): simplify date formatting
perf(rendering): memoize expensive component
docs(readme): update installation instructions
test(auth): add login form tests
```

---

## Performance Considerations

### Code Splitting
- Use `React.lazy()` for large components
- Lazy load heavy libraries
- Code split by route

### Bundle Size
- Check bundle size in CI/CD
- Avoid unnecessary dependencies
- Tree-shake unused code

### Rendering
- Memoize expensive components
- Use `useCallback` for callbacks
- Use `useMemo` for calculations
- Split state by frequency

---

## Accessibility Standards

- Use semantic HTML
- Ensure keyboard navigation
- Maintain 4.5:1 contrast ratio
- Add alt text to images
- Use proper ARIA labels
- Test with screen readers
