# Performance Rules

## Rendering Performance

### Rule: Minimize Re-renders
**What:** Profile components and eliminate unnecessary re-renders.

**Why:**
- Improves perceived performance
- Reduces CPU usage
- Better user experience
- Extends battery life on mobile

**How to apply:**
```tsx
// ✅ Good - memoize expensive component
const UserCard = React.memo(({ user }: { user: User }) => {
  return <div>{user.name}</div>;
});

// ✅ Good - split state to avoid cascading renders
const [visibleItems, setVisibleItems] = useState<number[]>([]);
// Filter items locally instead of updating parent state

// ❌ Bad - re-rendering entire list on item change
const [items, setItems] = useState(hugeList);
// Update causes all items to re-render
```

---

### Rule: Lazy Load Components
**What:** Use React.lazy() and Suspense for code-splitting.

**Why:**
- Reduces initial bundle size
- Faster initial load
- Better perceived performance
- Scales with larger apps

**How to apply:**
```tsx
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

const App = () => (
  <Suspense fallback={<Spinner />}>
    <HeavyComponent />
  </Suspense>
);
```

---

### Rule: Virtualize Long Lists
**What:** Use virtualization libraries for large lists (react-window, react-virtualized).

**Why:**
- Only renders visible items
- Massive performance improvement for large lists
- Smooth scrolling
- Better memory usage

**How to apply:**
- Install: `npm install react-window`
- Use FixedSizeList or VariableSizeList for large datasets
- Avoid rendering 1000+ items without virtualization

---

## Bundle Optimization

### Rule: Tree-Shake Unused Code
**What:** Write code that can be tree-shaken. Avoid side effects in modules.

**Why:**
- Reduces bundle size
- Faster downloads
- Better performance
- Smaller app footprint

**How to apply:**
```tsx
// ✅ Good - modular, tree-shakeable
export const formatDate = (date: Date) => date.toLocaleDateString();
export const parseDate = (str: string) => new Date(str);

// ❌ Bad - side effects prevent tree-shaking
console.log('Module loaded'); // This prevents tree-shaking
export const formatDate = (date: Date) => date.toLocaleDateString();
```

---

### Rule: Dynamic Imports for Large Dependencies
**What:** Use dynamic imports for heavy libraries loaded conditionally.

**Why:**
- Reduces main bundle
- Loads only when needed
- Better initial page load

**How to apply:**
```tsx
// ✅ Good - load chart library only when needed
const Chart = React.lazy(() => import('recharts').then(m => ({ default: m.LineChart })));

// Load markdown parser only in admin
const markdownParser = await import('markdown-it');
```

---

## State and Memoization

### Rule: Memoize Expensive Calculations
**What:** Use useMemo() for expensive computations.

**Why:**
- Avoids recalculation on every render
- Prevents unnecessary work
- Improves performance for complex operations

**How to apply:**
```tsx
const expensiveValue = useMemo(() => {
  return complexCalculation(data, filters);
}, [data, filters]);

// Without useMemo: recalculates on every render
```

---

### Rule: Separate State by Frequency
**What:** Split frequently-changing state from stable state.

**Why:**
- Prevents cascading re-renders
- Only relevant components update
- Better performance
- Cleaner component hierarchy

**How to apply:**
```tsx
// ✅ Good - separate state by change frequency
const [user, setUser] = useState(initialUser); // Changes rarely
const [mouseX, setMouseX] = useState(0); // Changes frequently

// ❌ Bad - one state for different frequencies
const [data, setData] = useState({ user, mouseX });
// Mouse move updates entire object, causing user component to re-render
```

---

## Network Performance

### Rule: Implement Request Debouncing
**What:** Debounce API requests from user input (search, resize, etc.).

**Why:**
- Reduces server load
- Saves bandwidth
- Better UX (less glitching)
- Lower latency

**How to apply:**
```tsx
const handleSearch = useCallback(
  debounce((query: string) => {
    fetchSearchResults(query);
  }, 300),
  []
);
```

---

### Rule: Implement Pagination or Infinite Scroll
**What:** Don't load all data at once. Use pagination or infinite scroll.

**Why:**
- Faster initial load
- Lower memory usage
- Better server performance
- Better UX

**How to apply:**
```tsx
const [page, setPage] = useState(1);
const { data, hasMore } = useInfiniteQuery(
  ['items', page],
  ({ pageParam = 1 }) => fetchItems(pageParam),
  { getNextPageParam: (lastPage) => lastPage.nextPage }
);
```

---

## Asset Optimization

### Rule: Optimize Images
**What:** Use modern formats, proper sizing, and lazy loading.

**Why:**
- Reduces page load time
- Saves bandwidth
- Better performance
- Better user experience

**How to apply:**
```tsx
// ✅ Good - modern format with fallback
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <source srcSet="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="Description" loading="lazy" />
</picture>

// ✅ Good - responsive images
<img 
  srcSet="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
  src="medium.jpg"
  alt="Description"
/>
```

---

## Monitoring and Measurement

### Rule: Monitor Core Web Vitals
**What:** Track and monitor Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS).

**Why:**
- Directly impact SEO and user satisfaction
- Identifies performance bottlenecks
- Enables data-driven optimization
- Improves user retention

**How to apply:**
```tsx
// Use web-vitals library
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getLCP(console.log);
```

---

### Rule: Use React DevTools Profiler
**What:** Regularly use React DevTools Profiler to identify slow components.

**Why:**
- Visualizes render times
- Identifies unnecessary re-renders
- Shows component hierarchy
- Data-driven optimization

**How to apply:**
- Install React DevTools browser extension
- Open DevTools → Profiler tab
- Record interactions
- Analyze render times and commit durations
