# TypeScript Standards

## Type Safety

### Rule: Strict Type Checking
**What:** Enable strict mode in tsconfig.json and type everything explicitly.

**Why:**
- Catches errors at compile time
- Prevents null/undefined bugs
- Improves code quality
- Better IDE support

**How to apply:**
```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true
  }
}
```

---

### Rule: Explicit Return Types
**What:** Always specify function return types explicitly.

**Why:**
- Prevents accidental type changes
- Documents function behavior
- Improves IDE support
- Catches bugs early

**How to apply:**
```tsx
// ✅ Good
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

const handleClick = (): void => {
  console.log('clicked');
};

// ❌ Bad - implicit return type
function calculateTotal(items: Item[]) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

---

### Rule: No `any` Type
**What:** Avoid using `any` type. Use `unknown` or proper types instead.

**Why:**
- `any` defeats TypeScript's purpose
- Hides potential bugs
- Reduces IDE support
- Makes code less maintainable

**How to apply:**
```tsx
// ✅ Good - using proper type
const processData = (data: object | string | number): void => {
  if (typeof data === 'string') {
    console.log(data.toUpperCase());
  }
};

// ✅ Good - using unknown
const processData = (data: unknown): void => {
  if (typeof data === 'string') {
    console.log(data);
  }
};

// ❌ Bad - using any
const processData = (data: any): void => {
  console.log(data.toUpperCase()); // Unsafe!
};
```

---

## Interface and Type Design

### Rule: Prefer Interfaces for Object Shapes
**What:** Use interfaces for defining object structures, types for everything else.

**Why:**
- Clearer intent
- Better for class implementation
- More flexible declaration merging
- Industry standard

**How to apply:**
```tsx
// ✅ Good - interface for object shape
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

// ✅ Good - type for union/primitives
type Status = 'pending' | 'success' | 'error';
type ApiResponse<T> = { data: T; error?: string };

// ❌ Avoid for objects
type User = {
  id: string;
  name: string;
};
```

---

### Rule: Extend Interfaces for Reuse
**What:** Use interface extension to build type hierarchies.

**Why:**
- DRY principle
- Clear inheritance relationship
- Reduces duplication
- Easier maintenance

**How to apply:**
```tsx
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface User extends BaseEntity {
  name: string;
  email: string;
}

interface Post extends BaseEntity {
  title: string;
  content: string;
  authorId: string;
}
```

---

### Rule: Use Utility Types
**What:** Leverage TypeScript utility types (Partial, Pick, Omit, Record, etc.).

**Why:**
- Reduces type duplication
- Creates flexible types
- DRY principle
- Easier refactoring

**How to apply:**
```tsx
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Creating related types without duplication
type UserPublic = Omit<User, 'password'>;
type UserUpdate = Partial<User>;
type UserFormData = Pick<User, 'name' | 'email'>;
```

---

## Generics

### Rule: Use Generics for Reusable Utilities
**What:** Create generic types and functions for reusable logic.

**Why:**
- Type-safe code reuse
- Reduces duplication
- Better code flexibility
- Improves maintainability

**How to apply:**
```tsx
// ✅ Good - generic function
function getById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}

// ✅ Good - generic component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <div>
      {items.map(item => (
        <div key={keyExtractor(item)}>{renderItem(item)}</div>
      ))}
    </div>
  );
}
```

---

## Const Assertions

### Rule: Use `as const` for Literal Types
**What:** Use const assertions for values that should be literal types.

**Why:**
- Prevents type widening
- Improves type inference
- Enables better type checking
- Reduces bugs from typos

**How to apply:**
```tsx
// ✅ Good - literal types
const roles = ['admin', 'user', 'guest'] as const;
type Role = (typeof roles)[number];

const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
} as const;

// ❌ Bad - inferred as string
const role = 'admin'; // Type is 'string', not 'admin'
```

---

## Null/Undefined Handling

### Rule: Handle Null and Undefined Explicitly
**What:** Always handle nullable values explicitly with strict checking.

**Why:**
- Prevents null reference errors
- Makes code safer
- Improves code clarity
- Catches bugs at compile time

**How to apply:**
```tsx
// ✅ Good - explicit null checking
const greet = (name: string | null): string => {
  if (name === null) {
    return 'Hello stranger!';
  }
  return `Hello ${name}!`;
};

// ✅ Good - nullish coalescing
const port = process.env.PORT ?? 3000;

// ✅ Good - optional chaining
const userName = user?.profile?.name;

// ❌ Bad - truthy check (0, '', false are falsy)
if (value) { /* ... */ }

// ✅ Good - explicit check
if (value !== null && value !== undefined) { /* ... */ }
```

---

## Enum vs Union Types

### Rule: Prefer Union Types Over Enums
**What:** Use discriminated unions instead of enums when possible.

**Why:**
- Better tree-shaking
- Simpler to understand
- More flexible
- Better TypeScript support

**How to apply:**
```tsx
// ✅ Good - union type
type Status = 'pending' | 'success' | 'error';
type LoadingState = { status: 'loading'; progress: number } | { status: 'success'; data: unknown };

// ❌ Avoid - enum
enum Status {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
```
