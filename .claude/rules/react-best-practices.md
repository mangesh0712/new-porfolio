# React Best Practices

## Component Architecture

### Functional Components Only
Use functional components with hooks. Never use class components.
- Hooks are the modern React standard
- Cleaner, more composable code
- Easier to test and maintain

```tsx
// ✅ Good
const MyComponent = ({ title }) => {
  const [count, setCount] = useState(0);
  return <div>{title}: {count}</div>;
};
```

---

### Single Responsibility Principle
Each component should have one clear responsibility.
- Break down large components into smaller ones
- Extract complex logic into custom hooks
- Keep components under 300 lines

---

### Props Validation with TypeScript
Always type component props explicitly.
```tsx
interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent) => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return <button className={`btn-${variant}`}>{label}</button>;
};
```

---

### Proper Hook Dependencies
Always include correct dependency arrays in useEffect and useCallback.
```tsx
useEffect(() => {
  const timer = setInterval(() => setCount(count + 1), 1000);
  return () => clearInterval(timer);
}, [count]);
```

---

### Key Prop in Lists
Always use stable, unique keys when rendering lists.
```tsx
// ✅ Good - using unique ID
const items = data.map(item => <Item key={item.id} item={item} />);

// ❌ Bad - using array index
const items = data.map((item, index) => <Item key={index} item={item} />);
```

---

## State Management

### Local State First
Keep state as local as possible. Only lift state when necessary.
- Start with useState in the component
- Only lift state if multiple components need it
- Use Context API for medium-complexity shared state

---

### Immutable State Updates
Never mutate state directly. Always create new objects/arrays.
```tsx
// ✅ Good
setItems([...items, newItem]);
setUser({ ...user, name: 'New Name' });

// ❌ Bad - mutating directly
items.push(newItem);
user.name = 'New Name';
```

---

## Performance

### Memoization for Expensive Components
Use React.memo() for components that receive referential props unchanged.
```tsx
const ExpensiveComponent = React.memo(({ data, onEvent }) => {
  return <div>{data.value}</div>;
});
```

---

### useCallback for Event Handlers
Wrap event handlers in useCallback when passing to memoized children.
```tsx
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);
```

---

## Code Organization

### File Structure
```
src/
├── components/
│   ├── sections/      (page sections)
│   ├── common/        (reusable components)
│   └── layouts/       (layout components)
├── hooks/             (custom hooks)
├── utils/             (utility functions)
├── types/             (TypeScript types)
├── styles/            (global styles)
├── services/          (API calls)
└── constants/         (constants)
```

---

### Component Naming
Use PascalCase for components, camelCase for utilities.
```tsx
// ✅ Component file (PascalCase)
// Hero.tsx, Navigation.tsx, UserProfile.tsx

// ✅ Utility file (camelCase)
// useFormValidation.ts, formatDate.ts
```

---

## Error Handling

### Error Boundaries
Use Error Boundaries for component error handling.
```tsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error(error);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

---

## Props Drilling Prevention

### Use Context or Composition
Avoid passing props through multiple levels.
```tsx
// ✅ Good - using Context
const ThemeContext = createContext();

// ❌ Bad - prop drilling
<A theme={theme}>
  <B theme={theme}>
    <C theme={theme} />
  </B>
</A>
```

---

## Accessibility

### Semantic HTML
Use proper semantic HTML elements.
```tsx
// ✅ Good
<header>Header</header>
<nav>Navigation</nav>
<main>Main content</main>
<article>Article</article>
<footer>Footer</footer>

// ❌ Bad
<div className="header">Header</div>
<div className="nav">Navigation</div>
```

---

### ARIA Labels
Add ARIA labels for screen readers when needed.
```tsx
<button aria-label="Close menu">✕</button>
<div role="alert" aria-live="polite">
  {errorMessage}
</div>
```

---

### Keyboard Navigation
Ensure all interactive elements are keyboard accessible.
```tsx
// ✅ Good
<button onClick={handleClick} onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') handleClick();
}}>
  Click me
</button>

// ✅ Use semantic buttons
<button>Accessible by default</button>
```

---

## Testing

### Test User Behavior, Not Implementation
Test what users see and do, not internal state.
```tsx
// ✅ Good
render(<Button label="Click me" onClick={handleClick} />);
userEvent.click(screen.getByRole('button', { name: 'Click me' }));

// ❌ Bad - testing implementation
expect(component.state.count).toBe(1);
```

---

### Test Important Paths
Test the happy path and critical error cases.
```tsx
describe('Login Form', () => {
  it('submits with valid credentials', () => {
    // Test success path
  });
  
  it('shows error on invalid credentials', () => {
    // Test error path
  });
  
  it('disables submit during loading', () => {
    // Test loading state
  });
});
```
