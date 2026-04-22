# Style Guide

## Formatting
- **Indent**: 2 spaces
- **Line Length**: 100 chars (soft), 120 chars (hard limit)
- **Quotes**: Single quotes for strings, double for JSX attributes
- **Semicolons**: Always use
- **Trailing Commas**: Use in multiline objects/arrays

## Naming Conventions
- **Constants**: UPPER_SNAKE_CASE (truly constant values only)
- **Variables/Functions**: camelCase
- **Components**: PascalCase
- **CSS Classes**: kebab-case (BEM: .card, .card__title, .card__button--primary)
- **Files**: Match export (Component.tsx, utils.ts)

## Imports
```typescript
// Order: External → Internal → Types (alphabetical)
import React, { useState } from 'react';
import { Button } from 'react-ui';

import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/sections/Header';
import type { User } from '@/types/user';
```

## Functions
```typescript
// Arrow functions for exports/callbacks
const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// Always specify return type
const handleClick = (): void => { /* ... */ };
```

## Components
```typescript
// Props interface → Component → Export
interface CardProps {
  title: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, onClick }) => {
  // 1. Hooks at top
  const [state, setState] = useState('');
  
  // 2. Event handlers
  const handleClick = useCallback(() => { /* ... */ }, []);
  
  // 3. Effects
  useEffect(() => { /* ... */ }, [state]);
  
  // 4. Render
  return <div>{title}</div>;
};

export default Card;
```

## TypeScript
```typescript
// Interfaces for object shapes
interface User {
  id: string;
  name: string;
}

// Types for unions/primitives
type Status = 'pending' | 'success' | 'error';

// No any, use unknown
const process = (data: unknown): void => { /* ... */ };

// Explicit return types
const getUser = (id: string): User | null => { /* ... */ };
```

## CSS/Tailwind
```tsx
// BEM methodology
<div className="card card--large">
  <h3 className="card__title">Title</h3>
  <button className="card__button card__button--primary">Action</button>
</div>

// Or Tailwind
<div className="p-4 bg-white rounded-lg shadow">
  <h3 className="text-lg font-semibold">Title</h3>
  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700">Action</button>
</div>
```

## Comments
Only comment WHY, not WHAT. Code should be self-explanatory.
```typescript
// ✅ Explains non-obvious logic
// Can't use destructuring here - React DevTools has trouble
// with arrow function component names
const Component = function MyComponent() { /* ... */ };

// ❌ States the obvious
// Get the user
const getUser = (id: string) => { /* ... */ };
```

## Git Commits
```
type(scope): brief description

Optional detailed explanation.

Fixes #123
```

Types: `feat`, `fix`, `refactor`, `perf`, `style`, `docs`, `test`, `chore`

Examples:
```
feat(auth): add login form
fix(button): fix disabled state styling
perf(rendering): memoize expensive component
docs(readme): update installation steps
```

## File Structure
```
src/
├── components/
│   ├── sections/   (Hero, Features, etc.)
│   ├── common/     (Button, Card, etc.)
│   └── layouts/    (MainLayout, etc.)
├── hooks/          (useAuth, useForm, etc.)
├── utils/          (formatDate, calculateTotal, etc.)
├── types/          (User, API types, etc.)
├── services/       (API calls)
├── styles/         (Global CSS)
└── constants/      (Config values)
```
