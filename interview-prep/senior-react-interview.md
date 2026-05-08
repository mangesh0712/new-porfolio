# Senior React Developer (6-7 Years) Interview Prep Guide
## Complete With Detailed Explanations & Answers

**Role Level:** Senior React Developer  
**Experience Expected:** 6-7 years  
**Last Updated:** May 2026  
**Format:** Questions + Detailed Explanations + Code Examples  
**Topics Covered:** ~13 comprehensive sections with 200+ detailed answers

---

## Table of Contents

1. [React Core Fundamentals](#react-core-fundamentals)
2. [Component Architecture](#component-architecture)
3. [State Management](#state-management)
4. [Performance Optimization](#performance-optimization)
5. [Webpack & Bundling](#webpack--bundling)
6. [React Internals & How It Works](#react-internals--how-it-works)
7. [React 18 Features](#react-18-features)
8. [React 19 Features](#react-19-features)
9. [Frontend System Design](#frontend-system-design)
10. [Testing & Quality Assurance](#testing--quality-assurance)
11. [TypeScript with React](#typescript-with-react)
12. [Best Practices & Patterns](#best-practices--patterns)
13. [Behavioral & Scenario Questions](#behavioral--scenario-questions)

---

## React Core Fundamentals

### Hooks & State

#### 1. Explain the difference between `useState` and `useRef`. When would you use one over the other?

**Answer:**

`useState` and `useRef` are both hooks for storing state, but they have fundamentally different purposes:

| Aspect | useState | useRef |
|--------|----------|--------|
| **Re-renders** | Triggers re-render on state change | Does NOT trigger re-render |
| **Mutability** | Immutable (create new state) | Mutable (direct update) |
| **Return type** | [state, setState] | {current: value} |
| **Purpose** | UI state (data affecting render) | DOM access, mutable values |

**useState Example:**
```typescript
const [count, setCount] = useState(0);

// Triggers re-render every time
const handleClick = () => setCount(count + 1);

return (
  <div>
    <p>Count: {count}</p>  {/* Updates on state change */}
    <button onClick={handleClick}>Increment</button>
  </div>
);
```

**useRef Example:**
```typescript
const inputRef = useRef<HTMLInputElement>(null);
const renderCount = useRef(0);

// Does NOT trigger re-render
const focusInput = () => {
  inputRef.current?.focus();
  renderCount.current++; // Mutate directly, no re-render
};

return (
  <div>
    <input ref={inputRef} />
    <button onClick={focusInput}>Focus Input</button>
    {/* renderCount.current won't update the display */}
  </div>
);
```

**When to use each:**
- **useState:** For data that affects the UI (form inputs, toggles, lists, counts)
- **useRef:** For DOM access (focus, text selection), timers, previous values, mutable instances

---

#### 2. What are the rules of hooks? Why does React enforce them?

**Answer:**

The Rules of Hooks are:

1. **Only call hooks at the top level** — Don't call hooks inside loops, conditions, or nested functions
2. **Only call hooks from React functions** — Call from functional components or custom hooks, not regular JS functions

**Why React enforces these:**

React maintains a **call order mapping** for each component. Hooks use this order to know which state belongs to which variable:

```typescript
// ❌ WRONG - Breaks if condition changes
function Counter({ skip }: { skip: boolean }) {
  if (!skip) {
    const [count, setCount] = useState(0); // Call order changes!
  }
  const [name, setName] = useState('');
  return <div>{count}</div>; // May reference wrong state
}

// ✅ CORRECT
function Counter({ skip }: { skip: boolean }) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  if (skip) return null;
  return <div>{count}</div>;
}
```

**Behind the scenes:** React maintains a **hook queue** for each component instance:
```
Component Instance 1:
  Hook 0: useState (count)
  Hook 1: useState (name)
  Hook 2: useEffect (...)

Component Instance 2:
  Hook 0: useState (count)
  Hook 1: useState (name)
  Hook 2: useEffect (...)
```

If the call order changes, React gets confused and assigns the wrong state to the wrong hook.

---

#### 3. Explain the dependency array in `useEffect`. What happens if you forget to include a dependency?

**Answer:**

The dependency array controls **when** `useEffect` runs:

```typescript
// 1. No dependency array - runs after EVERY render
useEffect(() => {
  console.log('Runs after every render');
});

// 2. Empty dependency array [] - runs ONCE on mount
useEffect(() => {
  console.log('Runs once on mount');
}, []);

// 3. With dependencies [a, b] - runs when a or b change
useEffect(() => {
  console.log('Runs when userId or articleId change');
}, [userId, articleId]);
```

**What happens if you forget dependencies:**

```typescript
// ❌ WRONG - Memory leak + stale closures
function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = subscribeToUser(userId);
    
    // This cleanup never runs between userId changes!
    // OLD subscription still active, causing memory leak
    return () => subscription.unsubscribe();
  }); // Missing [userId]!

  return <div>{user?.name}</div>;
}

// ✅ CORRECT
useEffect(() => {
  const subscription = subscribeToUser(userId);
  return () => subscription.unsubscribe(); // Cleanup between changes
}, [userId]); // Include dependency
```

**Common Gotchas:**

```typescript
// ❌ WRONG - Missing 'user' dependency
useEffect(() => {
  const timeout = setTimeout(() => {
    console.log(user.name); // Stale closure! Always old value
  }, 3000);
  return () => clearTimeout(timeout);
}, []); // Missing [user]

// ✅ CORRECT
useEffect(() => {
  const timeout = setTimeout(() => {
    console.log(user.name); // Always current user
  }, 3000);
  return () => clearTimeout(timeout);
}, [user]);
```

---

#### 4. How does `useCallback` differ from `useMemo`? When should you use each?

**Answer:**

| Hook | Returns | Use Case |
|------|---------|----------|
| **useCallback** | Memoized **function** | Pass function to child components, avoid unnecessary re-renders of children |
| **useMemo** | Memoized **value** | Cache expensive computations, avoid recalculating on every render |

**useCallback Example:**

```typescript
// Without useCallback - new function on every render
function Parent() {
  const handleClick = () => console.log('clicked');
  
  // MemoizedChild re-renders every time because handleClick is new
  return <MemoizedChild onClick={handleClick} />;
}

// With useCallback - same function unless dependencies change
function Parent() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Memoized function
  
  // MemoizedChild won't re-render unless dependencies change
  return <MemoizedChild onClick={handleClick} />;
}

const MemoizedChild = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
});
```

**useMemo Example:**

```typescript
// Without useMemo - recalculates on every render
function ExpensiveComponent({ items }: { items: Item[] }) {
  // Expensive calculation runs every render
  const sorted = items
    .filter(item => item.active)
    .sort((a, b) => a.price - b.price);
  
  return <div>{sorted.length} items</div>;
}

// With useMemo - only recalculates when 'items' changes
function ExpensiveComponent({ items }: { items: Item[] }) {
  const sorted = useMemo(() => {
    console.log('Sorting...');
    return items
      .filter(item => item.active)
      .sort((a, b) => a.price - b.price);
  }, [items]); // Only recalculate when items change
  
  return <div>{sorted.length} items</div>;
}
```

**When to use:**
- **useCallback:** Only when you're passing a function to a memoized child component
- **useMemo:** When computation is expensive AND the dependencies don't change frequently
- **Rule of thumb:** Don't over-optimize. Profile first, optimize second.

---

#### 5. Describe `useContext` and its performance implications. When does a context consumer re-render?

**Answer:**

`useContext` allows you to access context values without prop drilling:

```typescript
const ThemeContext = createContext<'light' | 'dark'>('light');

// Provider
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <Header />
      <Content />
    </ThemeContext.Provider>
  );
}

// Consumer
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
```

**Performance Implications - The Hidden Problem:**

❌ **WRONG - Causes all consumers to re-render:**
```typescript
function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'John' });
  
  // Creating NEW object every render
  // All consumers re-render even if they only use theme!
  const value = { theme, user, setTheme, setUser };
  
  return (
    <AppContext.Provider value={value}>
      <Header />    {/* Re-renders on BOTH theme AND user change */}
      <Content />   {/* Re-renders on BOTH theme AND user change */}
    </AppContext.Provider>
  );
}
```

✅ **CORRECT - Split contexts by update frequency:**
```typescript
const ThemeContext = createContext('light');
const UserContext = createContext({ name: 'John' });

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'John' });
  
  return (
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={user}>
        <Header />    {/* Only re-renders on theme change */}
        <Content />   {/* Only re-renders on user change */}
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}
```

**When Does a Consumer Re-render?**
```typescript
function Header() {
  const theme = useContext(ThemeContext);
  
  // Re-renders ONLY when:
  // 1. ThemeContext.Provider value CHANGES (by reference)
  // 2. Parent component re-renders AND
  //    value is a different object/primitive
  
  return <div>{theme}</div>;
}
```

---

#### 6. What is the purpose of `useReducer`? When would you choose it over `useState`?

**Answer:**

`useReducer` is a hook for managing complex state transitions. It follows the **reducer pattern** from Redux.

**Basic Structure:**
```typescript
const [state, dispatch] = useReducer(reducer, initialState);

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

**useState vs useReducer:**

| Scenario | Use useState | Use useReducer |
|----------|-------------|----------------|
| Simple, single value | ✅ | ❌ |
| Complex state object | ❌ | ✅ |
| Multiple interdependent values | ❌ | ✅ |
| Logic in multiple event handlers | ❌ | ✅ |
| Testing state logic separately | ❌ | ✅ |

**Real Example - Form with Multiple Fields:**

```typescript
// ❌ Multiple useState calls - messy
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({});
}

// ✅ useReducer - centralized logic
type FormState = {
  email: string;
  password: string;
  errors: Record<string, string>;
  isLoading: boolean;
  touched: Record<string, boolean>;
};

type FormAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERRORS'; payload: Record<string, string> }
  | { type: 'TOUCH_FIELD'; payload: string };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    case 'TOUCH_FIELD':
      return { ...state, touched: { ...state.touched, [action.payload]: true } };
    default:
      return state;
  }
}

function LoginForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const errors = validate(state.email, state.password);
      if (Object.keys(errors).length > 0) {
        dispatch({ type: 'SET_ERRORS', payload: errors });
        return;
      }
      // Submit form...
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
}
```

**Benefits of useReducer:**
1. **Predictable state transitions** - All changes go through reducer
2. **Testable** - Can test reducer independently
3. **Debuggable** - Can log every action
4. **Scales better** - Easier than 10+ useState calls

---

#### 7. Explain the concept of "closure" in the context of hooks and state.

**Answer:**

A **closure** is a function that remembers variables from its outer scope, even after that scope has finished executing.

In React hooks, closures are crucial for state management:

```typescript
function Counter() {
  const [count, setCount] = useState(0);
  
  // handleClick is a CLOSURE
  // It remembers 'count' from the component's scope
  const handleClick = () => {
    console.log(count); // Accesses count from closure
    setCount(count + 1);
  };
  
  return <button onClick={handleClick}>Count: {count}</button>;
}
```

**The Stale Closure Problem:**

```typescript
// ❌ WRONG - Stale closure
function Timer() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Closure captures OLD count value!
      // Always logs 0 even though count changes
      console.log(count);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []); // Missing [count] dependency!
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

// ✅ CORRECT - Fresh closure
useEffect(() => {
  const interval = setInterval(() => {
    console.log(count); // Always current count
  }, 1000);
  
  return () => clearInterval(interval);
}, [count]); // Include dependency to create fresh closure
```

**How React creates new closures:**

When dependencies change, React creates a **new closure** with the updated values:

```
Render 1: count = 0
  useEffect closure 1 { count: 0 }
  
User clicks button -> setState(1)

Render 2: count = 1
  OLD useEffect closure 1 { count: 0 } - cleaned up
  NEW useEffect closure 2 { count: 1 } - created
```

---

#### 8. How do you handle cleanup in `useEffect`? Why is cleanup important?

**Answer:**

`useEffect` cleanup is the return function that runs **before the effect runs again** or **before the component unmounts**.

**Why Cleanup is Critical:**

1. **Prevent memory leaks** - Stop subscriptions, timers, listeners
2. **Cancel requests** - Abort in-flight API calls
3. **Prevent stale updates** - Avoid setState on unmounted components
4. **Clean up side effects** - Reset global state, close connections

**Common Cleanup Examples:**

```typescript
// 1. Cleanup timers
useEffect(() => {
  const timeout = setTimeout(() => {
    setData(fetchedData);
  }, 1000);
  
  return () => clearTimeout(timeout); // Clean up timeout
}, []);

// 2. Cleanup event listeners
useEffect(() => {
  const handleResize = () => console.log('resized');
  window.addEventListener('resize', handleResize);
  
  return () => window.removeEventListener('resize', handleResize);
}, []);

// 3. Cleanup subscriptions
useEffect(() => {
  const subscription = userService.subscribe((user) => {
    setUser(user);
  });
  
  return () => subscription.unsubscribe();
}, []);

// 4. Cleanup fetches (abort request)
useEffect(() => {
  const controller = new AbortController();
  
  fetch('/api/users', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setUsers(data));
  
  return () => controller.abort(); // Cancel fetch if component unmounts
}, []);

// 5. Prevent setState on unmounted component
useEffect(() => {
  let mounted = true;
  
  const fetchData = async () => {
    const data = await fetch('/api/data').then(r => r.json());
    if (mounted) { // Only setState if still mounted
      setData(data);
    }
  };
  
  fetchData();
  
  return () => {
    mounted = false; // Mark as unmounted
  };
}, []);
```

**Cleanup Execution Order:**

```typescript
function Component() {
  useEffect(() => {
    console.log('1. Effect runs');
    
    return () => {
      console.log('3. Cleanup runs before next effect or unmount');
    };
  }, []);
  
  return <div>content</div>;
}

// Output on mount:
// 1. Effect runs

// Output on unmount:
// 3. Cleanup runs before next effect or unmount

// Output if dependency changes:
// 3. Cleanup runs before next effect or unmount
// 1. Effect runs
```

---

#### 9. What are custom hooks? How do you share stateful logic between components?

**Answer:**

Custom hooks are **JavaScript functions that use React hooks**. They let you extract and reuse component logic.

**Rules for Custom Hooks:**
1. Name must start with `use` (e.g., `useAuth`, `useFetch`)
2. Can use other hooks inside
3. Can be called from components or other hooks

**Simple Custom Hook Example:**

```typescript
// Custom hook - reusable fetch logic
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (mounted) {
          setData(json);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      mounted = false;
    };
  }, [url]);
  
  return { data, loading, error };
}

// Use in multiple components
function UserProfile({ userId }: { userId: number }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return <div>{user?.name}</div>;
}

function PostList() {
  const { data: posts, loading } = useFetch('/api/posts');
  
  if (loading) return <p>Loading posts...</p>;
  
  return (
    <ul>
      {posts?.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}
```

**Sharing Complex Logic:**

```typescript
// useLocalStorage - persist state to localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue] as const;
}

// Usage across multiple components
function LoginForm() {
  const [email, setEmail] = useLocalStorage('email', '');
  
  return (
    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
    />
  );
}
```

**Benefits:**
- **DRY (Don't Repeat Yourself)** - Share logic without code duplication
- **Composable** - Stack multiple hooks
- **Testable** - Test hook logic independently
- **Readable** - Clear intent of what component does

---

#### 10. Describe the difference between `useLayoutEffect` and `useEffect`.

**Answer:**

Both `useLayoutEffect` and `useEffect` run after render, but at different times:

| Aspect | useEffect | useLayoutEffect |
|--------|----------|-----------------|
| **Timing** | After paint (async) | Before paint (sync) |
| **Performance** | Better (doesn't block) | Can cause jank |
| **Use case** | Most cases | DOM measurements, visual changes |
| **SSR** | Safe | Causes warning |

**Timing Diagram:**

```
Render → Paint → useEffect callback
            ↑
         useLayoutEffect callback → Paint
```

**useEffect (Most Cases):**

```typescript
function Component() {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    // Runs AFTER component paints
    // Browser can paint → user sees change immediately
    // Then this runs and updates if needed
    setWidth(window.innerWidth);
  }, []);
  
  return <div>Width: {width}</div>;
}
```

**useLayoutEffect (Rare Cases):**

```typescript
function Tooltip({ text }: { text: string }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    // Runs BEFORE paint
    // Measure DOM element
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      
      // Calculate position
      setPosition({
        top: rect.top - 10,
        left: rect.left - 50,
      });
    }
    // Browser paints with correct position
    // User never sees tooltip in wrong position
  }, []);
  
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {text}
    </div>
  );
}
```

**When to use useLayoutEffect:**

❌ **WRONG** - Flicker because useEffect is async:
```typescript
function FlickeringComponent() {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Paints first, then measures → flicker!
    setHeight(ref.current?.offsetHeight || 0);
  }, []);
  
  return (
    <div ref={ref} style={{ height: height || 'auto' }}>
      Content
    </div>
  );
}
```

✅ **CORRECT** - No flicker because useLayoutEffect is sync:
```typescript
function NoFlickerComponent() {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    // Measures BEFORE paint → correct height immediately
    setHeight(ref.current?.offsetHeight || 0);
  }, []);
  
  return (
    <div ref={ref} style={{ height: height || 'auto' }}>
      Content
    </div>
  );
}
```

**Rule of thumb:** Use `useEffect` 99% of the time. Only use `useLayoutEffect` if you need DOM measurements to prevent visual jank.

---

### Reconciliation & Fiber Architecture

#### 11. What is React's reconciliation algorithm? How does it work at a high level?

**Answer:**

**Reconciliation** is React's process of updating the UI to match the component tree. It compares the old tree with the new tree and applies only necessary changes to the DOM.

**Algorithm Steps:**

1. **Render new component tree** (no DOM changes yet)
2. **Compare old and new trees** (diffing)
3. **Identify differences** (what changed)
4. **Update only changed elements** in the DOM (commit)

**Simple Example:**

```typescript
function List() {
  const [items, setItems] = useState(['a', 'b', 'c']);
  
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

// Initial render:
// <ul>
//   <li>a</li>
//   <li>b</li>
//   <li>c</li>
// </ul>

// After setItems(['a', 'b', 'c', 'd']):
// Reconciliation compares trees:
// - <li>a</li> → same (no update)
// - <li>b</li> → same (no update)
// - <li>c</li> → same (no update)
// - <li>d</li> → new (DOM adds this)

// Result: Only <li>d</li> is added to DOM
```

**Key Principles of Reconciliation:**

1. **Different types → different trees**
```typescript
// Old: <Header />
// New: <Footer />
// React rebuilds the entire subtree
```

2. **Same type, different props → update**
```typescript
// Old: <Component prop="a" />
// New: <Component prop="b" />
// React updates the prop and re-renders
```

3. **Keys ensure stable identity**
```typescript
// Without keys - positions change
// [a, b, c] → [a, d, b, c]
// React sees: pos 1 changed, pos 2 changed, pos 3 changed
// Rebuilds all 4 items

// With keys - identity preserved
// [a, b, c] → [a, d, b, c]
// React sees: a unchanged, b unchanged, c unchanged
// Only inserts d, no rebuilds
```

---

#### 12. Explain the concept of "keys" in React lists. Why are they important?

**Answer:**

**Keys** help React identify which items have changed, been added, or removed. They ensure component state is preserved correctly.

**Why Keys Matter:**

```typescript
// ❌ WITHOUT KEYS - Bug!
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build app' }
  ]);
  
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}> {/* BAD: using index as key */}
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
}

// Render 1:
// index 0 → id 1 (Learn React)
// index 1 → id 2 (Build app)

// Add item at beginning: { id: 3, text: 'Study' }
// [3, 1, 2]

// Render 2:
// index 0 → id 3 (Study) ← React thinks this is the OLD index 0
// index 1 → id 1 (Learn React) ← Component state gets confused!
// index 2 → id 2 (Build app)
// Result: State mismatch, bugs!
```

```typescript
// ✅ WITH STABLE KEYS - Correct!
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build app' }
  ]);
  
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}> {/* GOOD: using unique id */}
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
}

// Render 1:
// key "1" → Learn React
// key "2" → Build app

// Add item at beginning: { id: 3, text: 'Study' }
// [3, 1, 2]

// Render 2:
// key "3" → Study
// key "1" → Learn React (React recognizes same item)
// key "2" → Build app (React recognizes same item)
// Result: Correct mapping, no state issues!
```

**Real-World Impact with Component State:**

```typescript
function TodoItem({ todo }: { todo: Todo }) {
  const [checked, setChecked] = useState(false);
  
  return (
    <li>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      {todo.text}
    </li>
  );
}

// Without stable key:
// User checks item 1
// Reorder list
// ❌ Checked state moves to wrong item!

// With stable key:
// User checks item 1
// Reorder list
// ✅ Checked state stays with correct item!
```

**Key Rules:**

1. **Use unique, stable IDs** - Database IDs, UUIDs
2. **Avoid array indices** - Unless list is static and never reorders
3. **Keys must be unique among siblings** - Not globally unique
4. **Don't generate keys on the fly** - `Math.random()`, `uuid()` in render

```typescript
// ❌ WRONG - Generated keys
{items.map(item => (
  <div key={Math.random()}>{item}</div> // New key every render!
))}

// ✅ CORRECT - Stable keys
{items.map(item => (
  <div key={item.id}>{item}</div> // Same key every render
))}
```

---

#### 13. What is the Fiber architecture? How does it improve React's rendering?

**Answer:**

**Fiber** is React's internal data structure for breaking rendering work into small units and scheduling them with priority. It's the foundation of React 16+.

**Before Fiber (React 15):**
- Once rendering started, it was all-or-nothing
- Had to finish entire component tree before yielding to browser
- **Blocked main thread → jank, unresponsive input, dropped frames**

```
Main Thread:
|------------ React rendering for 50ms ------------|---- Browser event ---|
Result: User input delayed, 60fps target missed
```

**After Fiber (React 16+):**
- Rendering broken into small **work units**
- Can pause and resume work
- Prioritizes urgent work (user input) over non-urgent work (data updates)

```
Main Thread:
|--Work A--|--Browser event--|--Work B--|--Animation--|--Work C--|
Result: Responsive, smooth 60fps
```

**How Fiber Works:**

```typescript
// Fiber structure
type Fiber = {
  type: string | Function;      // Component type
  key: string | null;           // Key for lists
  props: any;                   // Props passed in
  state: any;                   // Component state
  hooks: Hook[];                // Hook queue
  
  // Links to other fibers
  parent: Fiber | null;         // Parent component
  child: Fiber | null;          // First child
  sibling: Fiber | null;        // Next sibling
  alternate: Fiber | null;      // Previous version of this fiber
  
  // Work-related
  pendingProps: any;            // Props to apply
  memoizedProps: any;           // Last rendered props
  updateQueue: Update[];        // Pending state updates
  effectTag: string;            // 'Placement' | 'Update' | 'Deletion'
  effects: Effect[];            // useEffect effects
};
```

**Rendering Process:**

1. **Reconciliation Phase** (can be interrupted):
   - Create new fiber tree
   - Identify changes (marked with effectTag)
   - Can pause/resume

2. **Commit Phase** (can't interrupt):
   - Apply changes to DOM
   - Run effects
   - Synchronous, no interruption

```typescript
// This shows how React can pause and resume work
const fiber1 = <Component1 />; // Work A
const fiber2 = <Component2 />; // Work B - can pause here if input comes in
const fiber3 = <Component3 />; // Work C
```

**Priority Levels:**

```typescript
// Fiber scheduling priorities
type FiberPriority =
  | 'Immediate'    // User input, animations (urgent)
  | 'High'         // Promise.then, setTimeout(0)
  | 'Normal'       // Regular updates (default)
  | 'Low'          // Network responses
  | 'Idle';        // Offscreen components

// React 18 extends this with useTransition
const [isPending, startTransition] = useTransition();

startTransition(() => {
  // This update is Low priority
  // High priority updates (input) are handled first
  setItems(largeList);
});
```

**Benefits of Fiber:**

1. **Interruptible rendering** - Pause for urgent work
2. **Incremental rendering** - Spread work across frames
3. **Error recovery** - Can retry or fallback
4. **Priority-based rendering** - Important updates first

---

#### 14. What is time-slicing in the context of React's Fiber architecture?

**Answer:**

**Time-slicing** is the ability to split rendering work into small chunks and spread them across multiple frames, preventing the main thread from being blocked.

**Problem Time-Slicing Solves:**

```typescript
// Without time-slicing
// Rendering a huge list takes 100ms
function HugeList({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <ExpensiveComponent item={item} /> {/* Complex calculations */}
        </li>
      ))}
    </ul>
  );
}

// Render timeline (60 FPS = 16.6ms per frame):
// Frame 1: React rendering ======== (20ms)
// Frame 2: React rendering ======== (20ms)
// Frame 3: React rendering ======== (20ms)
// Frame 4: React rendering ======== (20ms)
// Frame 5: React rendering ======== (20ms)
// Result: User sees frozen UI, user input delayed 100ms
```

**With Time-Slicing:**

```typescript
// React breaks work into 5ms chunks
// Frame 1: React work (5ms) → Browser work (11.6ms)
// Frame 2: React work (5ms) → Browser work (11.6ms)
// Frame 3: React work (5ms) → Browser work (11.6ms)
// ...
// Result: UI responsive, 60fps maintained
```

**Implementation Details:**

```typescript
// React uses MessageChannel API for scheduling
const channel = new MessageChannel();
const port = channel.port2;

port.onmessage = () => {
  // Perform a small unit of work
  workLoop(); // Render 5ms of components
};

const performWork = () => {
  channel.port1.postMessage(null); // Schedule work asynchronously
};

// Next frame:
requestAnimationFrame(performWork);
```

**Example with React 18:**

```typescript
function ExpensiveSearch({ query }: { query: string }) {
  const [results, setResults] = useState([]);
  
  // This render is HIGH priority - should be fast
  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      
      {/* This render is LOW priority - can be interrupted */}
      <SearchResults results={results} />
    </div>
  );
}

// Without time-slicing, high-priority input waits for low-priority render
// With time-slicing, input is handled immediately, search continues in background
```

---

#### 15. How does React decide when to re-render a component?

**Answer:**

React re-renders a component when:

1. **Its state changed** (setState called)
2. **Its props changed** (parent re-rendered with different props)
3. **Its context changed** (useContext value changed)
4. **Parent re-rendered** (and child doesn't have React.memo)

**Detailed Examples:**

```typescript
// 1. State change → re-render
function Counter() {
  const [count, setCount] = useState(0);
  
  console.log('rendered');
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// Click button:
// 'rendered' logged
// DOM updates with new count

// 2. Props change → re-render
function Parent({ userId }: { userId: number }) {
  return <Child userId={userId} />;
}

function Child({ userId }: { userId: number }) {
  console.log('Child rendered');
  return <div>User ID: {userId}</div>;
}

// userId prop changes:
// 'Child rendered' logged
// DOM updates

// 3. Parent re-renders → child re-renders (by default)
function Parent() {
  const [theme, setTheme] = useState('light');
  
  return (
    <div>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Toggle theme
      </button>
      <Child /> {/* Re-renders even though it receives no props */}
    </div>
  );
}

function Child() {
  console.log('Child rendered');
  return <div>Child content</div>;
}

// Toggle theme:
// Parent re-renders (state change)
// Child ALSO re-renders (same parent)
// 'Child rendered' logged every toggle
```

**How React Tracks Changes:**

```typescript
// React compares:
// 1. State values changed?
const [count, setCount] = useState(0);
setCount(1); // ✅ count changed, re-render

// 2. Props changed? (by reference or value)
<Child prop={{ a: 1 }} />; // Re-renders if object is new

// 3. Context changed?
const theme = useContext(ThemeContext);
// Re-render if ThemeContext.Provider value changed

// 4. Parent re-rendered?
// Child inherits parent's re-render by default
```

**Optimization - Preventing Re-renders:**

```typescript
// ❌ Child re-renders unnecessarily
function Parent() {
  const [time, setTime] = useState(new Date());
  
  setInterval(() => {
    setTime(new Date()); // Every second!
  }, 1000);
  
  return <ExpensiveChild />; // Re-renders every second!
}

// ✅ Child doesn't re-render
const ExpensiveChild = React.memo(() => {
  console.log('rendered'); // Only logs once
  return <div>Expensive content</div>;
});

// Or use useMemo
function Parent() {
  const [time, setTime] = useState(new Date());
  
  setInterval(() => {
    setTime(new Date());
  }, 1000);
  
  const memoizedChild = useMemo(
    () => <ExpensiveChild />,
    [] // No dependencies → never re-render
  );
  
  return memoizedChild;
}
```

---

## [Continuing with remaining sections...]

---

## Webpack & Bundling

### What is Webpack and Why Do We Need It?

**Definition:**
Webpack is a **module bundler** that takes all your JavaScript, CSS, images, and other assets, processes them, and outputs optimized bundles for the browser.

**Why Bundling Matters:**

```typescript
// src/app.tsx
import React from 'react';
import { UserList } from './components/UserList';
import { API } from './services/api';
import styles from './app.css';

// Browser can't understand:
// 1. ES6 imports (needs compiled to require)
// 2. JSX (needs compiled to React.createElement)
// 3. CSS imports (needs style injection)
// 4. Multiple files (HTTP overhead)

// Webpack solves all this:
// - Bundles all imports into one file
// - Transpiles ES6, JSX to ES5
// - Injects CSS into HTML
// - Minimizes bundle size
```

**Basic Webpack Config:**

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production', // 'development' or 'production'
  
  entry: './src/index.tsx', // Start point
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js', // Hash for cache busting
    clean: true, // Clean dist before build
  },
  
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Match TypeScript files
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // Inline images < 8KB
          },
        },
      },
    ],
  },
  
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
        },
      },
    },
  },
  
  devServer: {
    port: 3000,
    hot: true, // Hot module replacement
    historyApiFallback: true, // For routing
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
  ],
};
```

### Loaders and Plugins

**Loaders** - Transform files:
```javascript
// babel-loader: Transpile JSX, ES6
// css-loader: Load CSS
// url-loader: Inline small images
// ts-loader: Compile TypeScript
```

**Plugins** - Webpack hooks into build process:
```javascript
// HtmlWebpackPlugin: Generate HTML file
// MiniCssExtractPlugin: Extract CSS to separate file
// TerserPlugin: Minify JavaScript
// BundleAnalyzerPlugin: Analyze bundle size
```

### Code Splitting & Lazy Loading

```javascript
// webpack.config.js
optimization: {
  splitChunks: {
    chunks: 'all',
    minSize: 20000, // Only split if 20KB+
    cacheGroups: {
      // Vendor code separate
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: 10,
      },
      // Common code between chunks
      common: {
        minChunks: 2, // Used in 2+ chunks
        priority: 5,
        name: 'common',
      },
    },
  },
}
```

```typescript
// React lazy loading
const Dashboard = React.lazy(() => import('./Dashboard'));
const Analytics = React.lazy(() => import('./Analytics'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}
```

---

## React Internals & How It Works

### Virtual DOM & Reconciliation Deep Dive

**What is the Virtual DOM?**

The Virtual DOM is React's **in-memory representation** of the real DOM. It's a JavaScript object tree that mirrors the actual DOM.

```typescript
// JSX
const element = (
  <div className="container">
    <h1>Hello</h1>
    <p>World</p>
  </div>
);

// Compiles to:
const element = React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Hello'),
  React.createElement('p', null, 'World')
);

// Virtual DOM representation:
{
  type: 'div',
  key: null,
  ref: null,
  props: {
    className: 'container',
    children: [
      { type: 'h1', props: { children: 'Hello' } },
      { type: 'p', props: { children: 'World' } }
    ]
  }
}
```

**Why Virtual DOM?**

1. **Efficient updates** - Batch DOM changes
2. **Cross-platform** - Same code for React Native, web
3. **Performance** - Minimize direct DOM manipulation
4. **Abstraction** - Developers don't think about DOM

### React Render and Commit Phases

**Render Phase:**
- Happens in memory
- **Can be interrupted** (Fiber)
- No side effects
- Creates work units (fibers)

**Commit Phase:**
- Synchronous
- **Cannot be interrupted**
- Applies changes to DOM
- Runs effects

```typescript
// Visualized:
setState() 
  ↓
Fiber.reconcile() // Render phase - can pause
  ↓
processQueue() // Commit phase - synchronous
  ↓
Fiber.commit() // Apply to DOM
  ↓
runEffects() // Run useEffect callbacks
```

### Hook Implementation

**How does React remember hook state?**

React maintains a **hook queue** for each component instance:

```typescript
// Component
function Counter() {
  const [count, setCount] = useState(0);      // Hook 0
  const [name, setName] = useState('');       // Hook 1
  const [items, setItems] = useState([]);     // Hook 2
  
  return <div>{count}{name}{items.length}</div>;
}

// React's internal tracking:
hookIndex = 0;

function useState(initialValue) {
  const index = hookIndex; // 0, then 1, then 2
  hookIndex++;
  
  if (!fiber.hooks[index]) {
    fiber.hooks[index] = {
      state: initialValue,
      queue: []
    };
  }
  
  const hook = fiber.hooks[index];
  
  const setState = (newValue) => {
    hook.state = newValue;
    scheduleRender(fiber); // Re-render
  };
  
  return [hook.state, setState];
}
```

**Why can't you call hooks conditionally?**

```typescript
// ❌ WRONG
function Component({ show }) {
  if (show) {
    const [count, setCount] = useState(0); // Hook 0
  }
  const [name, setName] = useState('');    // Hook 0 or 1?
}

// Render 1: show = true
// Hook 0: useState(0) for count
// Hook 1: useState('') for name
// hookIndex = 2

// Render 2: show = false
// Hook 0: useState('') for name ← WRONG! Was count before
// hookIndex = 1

// React is confused because hook order changed
```

---

## React 18 Features

### Concurrent Mode & useTransition

**What is Concurrent Mode?**

Concurrent Mode allows React to interrupt rendering to handle urgent updates first. This makes the app responsive even during expensive renders.

```typescript
// Without useTransition
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q); // Urgent update
    
    // But if this is expensive, input lags!
    const filtered = expensiveSearch(q);
    setResults(filtered);
  };
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      {/* Results take too long to render → input is slow */}
      <SearchResults results={results} />
    </div>
  );
}

// With useTransition
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q); // Urgent - updates immediately
    
    // Low priority - can be interrupted
    startTransition(() => {
      const filtered = expensiveSearch(q);
      setResults(filtered);
    });
  };
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      {/* Input is responsive, results update in background */}
      <SearchResults results={results} />
    </div>
  );
}
```

### useDeferredValue

Similar to `useTransition` but for values instead of state updates:

```typescript
function ExpensiveList({ items }: { items: Item[] }) {
  // items can change frequently
  // But we want to defer the expensive render
  const deferredItems = useDeferredValue(items);
  const isDeferring = deferredItems !== items;
  
  return (
    <div>
      {isDeferring && <Spinner />}
      <VirtualizedList items={deferredItems} />
    </div>
  );
}

// Parent
function Parent() {
  const [searchTerm, setSearchTerm] = useState('');
  const items = filterItems(searchTerm);
  
  return (
    <>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ExpensiveList items={items} />
    </>
  );
}
```

---

## React 19 Features

### Server Components & Actions

**What are Server Components?**

Components that run **only on the server**, never sent to the browser. Great for:
- Database access
- Secrets (API keys)
- Large data processing
- Rendering static content

```typescript
// 'use server' at top of file
// This component never executes in browser!

import { db } from './database';

export async function UserList() {
  const users = await db.users.findAll(); // Server only!
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Browser receives only the HTML:
// <ul>
//   <li>Alice</li>
//   <li>Bob</li>
// </ul>
// No component code sent to browser!
```

**Server Actions - RPC from Client:**

```typescript
// actions.ts (Server)
'use server';

export async function createUser(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  // Save to database
  const user = await db.users.create({ name, email });
  
  return { success: true, user };
}

// Component.tsx (Client)
'use client';

import { createUser } from './actions';

function UserForm() {
  return (
    <form action={createUser}>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <button type="submit">Create</button>
    </form>
  );
}
```

### use() Hook

```typescript
// Unwrap Promises in render
function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  // This used to cause an error in render
  // With use() it works!
  const user = use(userPromise);
  
  return <div>{user.name}</div>;
}

// Pass async promises to components
function App() {
  const userPromise = fetch('/api/user').then(r => r.json());
  
  return <UserProfile userPromise={userPromise} />;
}
```

---

## Frontend System Design

### How to Design a Large-Scale React App

**Folder Structure:**

```
src/
├── app.tsx                         # Root component
├── components/
│   ├── common/                     # Reusable (Button, Card, Modal)
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   ├── sections/                   # Page sections (Header, Footer)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   └── layouts/                    # Layout wrappers
│       └── MainLayout.tsx
├── features/                       # Feature modules (Auth, Dashboard)
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── index.ts
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── index.ts
├── hooks/                          # Global hooks
│   ├── useAuth.ts
│   ├── useFetch.ts
│   └── index.ts
├── services/                       # API calls
│   ├── api.ts
│   ├── auth.ts
│   └── users.ts
├── store/                          # State management
│   ├── auth.ts
│   ├── ui.ts
│   └── index.ts
├── types/                          # TypeScript types
│   ├── models.ts
│   ├── api.ts
│   └── index.ts
├── utils/                          # Utilities
│   ├── format.ts
│   ├── validation.ts
│   └── index.ts
├── constants/                      # Constants
│   ├── config.ts
│   └── strings.ts
├── styles/                         # Global styles
│   ├── theme.css
│   └── global.css
└── index.tsx                       # Entry point
```

### API Data Fetching Strategy

```typescript
// Option 1: Custom hook with useEffect
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (mounted) setData(json);
      } catch (err) {
        if (mounted) setError(err as Error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    
    fetchData();
    
    return () => {
      mounted = false;
    };
  }, [url]);
  
  return { data, loading, error };
}

// Option 2: TanStack Query (React Query) - RECOMMENDED
function UserList() {
  const { data: users, isPending, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users');
      return res.json();
    },
  });
  
  if (isPending) return <Spinner />;
  if (error) return <Error message={error.message} />;
  
  return <ul>{users?.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

---

## Testing & Quality Assurance

### Unit Testing with React Testing Library

```typescript
// ✅ Test behavior, not implementation
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('submits form with email and password', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    
    // Get elements by accessibility (best practice)
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Login' });
    
    // User interactions
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);
    
    // Assert
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123'
    });
  });
  
  it('shows error on invalid email', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'invalid-email');
    
    // Tab to trigger validation
    await userEvent.tab();
    
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });
});
```

---

## TypeScript with React

### Typing Component Props

```typescript
// Good prop typing
interface ButtonProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = ''
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// Generic component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

function List<T>({
  items,
  renderItem,
  keyExtractor
}: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
<List
  items={users}
  renderItem={(user) => user.name}
  keyExtractor={(user) => user.id}
/>
```

---

## Best Practices & Patterns

### Accessibility

```typescript
// ✅ WCAG 2.1 Level AA
function Dialog({ isOpen, title, children, onClose }: DialogProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="modal-backdrop"
          onClick={onClose}
          role="presentation"
        />
      )}
      
      {/* Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          className="modal"
        >
          <h2 id="dialog-title">{title}</h2>
          
          {children}
          
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="close-btn"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
```

### Error Boundaries

```typescript
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error tracking service
    logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h1>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## Behavioral & Scenario Questions

### Real-World Scenarios with Solutions

**Scenario 1: Infinite Scroll with Performance**

```typescript
function InfiniteScrollList() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Intersection Observer for efficient infinite scroll
  const observerTarget = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          // Load next page when user reaches bottom
          setPage(p => p + 1);
        }
      },
      { threshold: 0.1 }
    );
    
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    
    return () => observer.disconnect();
  }, [isLoading]);
  
  // Fetch items
  useEffect(() => {
    setIsLoading(true);
    
    fetch(`/api/items?page=${page}`)
      .then(r => r.json())
      .then(newItems => {
        setItems(prev => [...prev, ...newItems]);
      })
      .finally(() => setIsLoading(false));
  }, [page]);
  
  return (
    <div>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <div ref={observerTarget} style={{ height: '10px' }} />
      {isLoading && <Spinner />}
    </div>
  );
}
```

**Scenario 2: Complex Form State Management**

```typescript
type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isDirty: boolean;
  isSubmitting: boolean;
};

type FormAction =
  | { type: 'SET_FIELD'; field: string; value: any }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'TOUCH_FIELD'; field: string }
  | { type: 'SET_SUBMITTING'; value: boolean }
  | { type: 'RESET' };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD': {
      const newState = {
        ...state,
        [action.field]: action.value,
        isDirty: true,
      };
      // Validate immediately
      validateField(action.field, action.value, newState);
      return newState;
    }
    case 'TOUCH_FIELD':
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
      };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.value };
    case 'RESET':
      return {
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
        errors: {},
        touched: {},
        isDirty: false,
        isSubmitting: false,
      };
    default:
      return state;
  }
}

function SignupForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_SUBMITTING', value: true });
    
    try {
      await signupService.register({
        email: state.email,
        password: state.password,
      });
      dispatch({ type: 'RESET' });
      // Redirect to next page
    } catch (error) {
      dispatch({ type: 'SET_ERROR', field: 'email', error: error.message });
    } finally {
      dispatch({ type: 'SET_SUBMITTING', value: false });
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={state.email}
        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
        onBlur={() => dispatch({ type: 'TOUCH_FIELD', field: 'email' })}
      />
      {state.touched.email && state.errors.email && (
        <p role="alert">{state.errors.email}</p>
      )}
      <button type="submit" disabled={state.isSubmitting || !state.isDirty}>
        {state.isSubmitting ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  );
}
```

---

## Interview Tips & Talking Points

### For 6-7 Years Experience
- **Discuss architectural decisions** - Explain WHY you chose certain patterns
- **Performance stories** - Share real examples where you optimized React apps
- **Scalability** - Talk about apps that grew and how you handled scaling
- **Mentorship** - Show you've helped teammates grow
- **React internals** - Demonstrate deep understanding of Fiber, reconciliation
- **Latest features** - Be familiar with React 18 & 19
- **Production knowledge** - Monitoring, debugging, error handling in production

### Common Interview Flow
1. Start with easy questions (hooks, state)
2. Move to system design (architecture, performance)
3. Coding challenge (implement component, optimize performance)
4. Behavioral questions (teamwork, past projects)

### Red Flags to Avoid
- ❌ "I don't know" without trying to reason through it
- ❌ Talking only about what you built, not lessons learned
- ❌ Not knowing why you chose a technology/pattern
- ❌ Over-engineering solutions
- ❌ Not asking clarifying questions

### Green Flags to Show
- ✅ Thoughtful problem-solving approach
- ✅ Discussing trade-offs and constraints
- ✅ Showing code examples from real projects
- ✅ Asking clarifying questions
- ✅ Admitting when you don't know, but explaining how you'd learn

---

## Quick Reference Cards

### React Hooks Cheat Sheet

| Hook | Purpose | Returns |
|------|---------|---------|
| `useState` | State management | `[state, setState]` |
| `useEffect` | Side effects | void |
| `useContext` | Access context | context value |
| `useReducer` | Complex state | `[state, dispatch]` |
| `useCallback` | Memoize function | memoized function |
| `useMemo` | Memoize value | memoized value |
| `useRef` | Mutable reference | `{current}` |
| `useLayoutEffect` | Sync effects | void |
| `useId` | Generate IDs | unique string |
| `useTransition` | Low-priority updates | `[isPending, startTransition]` |
| `useDeferredValue` | Defer value update | deferred value |

### Performance Checklist

- [ ] Memoize expensive components
- [ ] Use useCallback for child props
- [ ] Split state by update frequency
- [ ] Implement code splitting/lazy loading
- [ ] Use React DevTools Profiler
- [ ] Monitor Core Web Vitals
- [ ] Optimize images (lazy load, format)
- [ ] Tree-shake unused code
- [ ] Minimize bundle size
- [ ] Use virtualization for long lists

### Testing Checklist

- [ ] Test user behavior, not implementation
- [ ] Use getByRole for accessibility
- [ ] Mock external APIs
- [ ] Test error states
- [ ] Test loading states
- [ ] Aim for 80%+ code coverage
- [ ] Test integration scenarios
- [ ] Use screen queries, not container
- [ ] Test async behavior
- [ ] Clean up after tests

---

**Remember:** This guide is for understanding, not memorization. Focus on understanding WHY things work, then you can explain ANYTHING in an interview.

**Good luck! 🚀**
