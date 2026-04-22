# Optimization Skill

## Overview
Identify, measure, and eliminate performance bottlenecks in the application.

## Performance Measurement

### Tools
- **React DevTools Profiler**: Measure component render times
- **Chrome DevTools**: Inspect network, rendering, memory
- **Lighthouse**: Measure Core Web Vitals
- **Bundle Analyzer**: Analyze bundle size
- **Performance API**: Measure code execution

---

### Key Metrics
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.8s
- **TTI** (Time to Interactive): < 3.8s

---

## Optimization Techniques

### Bundle Size
- Use tree-shaking
- Remove unused dependencies
- Implement code splitting
- Use dynamic imports
- Minify code
- Compress images

```bash
# Analyze bundle
npm run build && npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/assets/*.js
```

---

### Component Performance
- Memoize expensive components
- Split state by update frequency
- Use useCallback for callbacks
- Use useMemo for calculations
- Lazy load heavy components
- Virtualize long lists

```tsx
// Optimize re-renders
const MemoizedComponent = React.memo(({ data }) => {
  return <div>{data.value}</div>;
}, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  return prevProps.data.value === nextProps.data.value;
});
```

---

### Network Performance
- Implement request debouncing
- Use pagination instead of loading all
- Lazy load images
- Compress images (WebP format)
- Use CDN for assets
- Cache API responses

```typescript
const debouncedSearch = debounce((query) => {
  fetchSearchResults(query);
}, 300);
```

---

### Rendering Performance
- Remove layout thrashing
- Batch DOM updates
- Use requestAnimationFrame
- Debounce resize handlers
- Use CSS animations over JS
- Avoid expensive calculations in render

```tsx
// Bad - triggers layout thrashing
for (let i = 0; i < elements.length; i++) {
  const height = elements[i].offsetHeight; // Read
  elements[i].style.height = height + 10 + 'px'; // Write (forced reflow)
}

// Good - batch reads and writes
const heights = elements.map(el => el.offsetHeight); // Read all
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px'; // Write all
});
```

---

## Optimization Checklist

- [ ] Bundle size analyzed
- [ ] Unused code removed
- [ ] Code splitting implemented
- [ ] Images optimized
- [ ] Long tasks identified
- [ ] Re-renders minimized
- [ ] API calls optimized
- [ ] Caching implemented
- [ ] Core Web Vitals acceptable
- [ ] Performance regression avoided

---

## Profiling Workflow

1. **Measure**: Use Lighthouse or DevTools to get baseline
2. **Identify**: Find the slowest operations
3. **Optimize**: Apply specific techniques
4. **Measure again**: Verify improvement
5. **Deploy**: Monitor production metrics

```bash
# Generate Lighthouse report
npm install -g lighthouse
lighthouse https://your-site.com --view
```

---

## Common Issues & Solutions

### Slow Initial Load
- [ ] Implement code splitting
- [ ] Lazy load below-the-fold content
- [ ] Optimize critical path
- [ ] Use Server-Side Rendering (SSR)

### Slow Interactions
- [ ] Profile with React DevTools
- [ ] Memoize expensive components
- [ ] Use useCallback on callbacks
- [ ] Debounce user input

### Memory Leaks
- [ ] Check for missing cleanup in useEffect
- [ ] Remove event listeners
- [ ] Clear intervals/timeouts
- [ ] Use React DevTools Profiler

### Large Bundle
- [ ] Analyze with bundle analyzer
- [ ] Remove unused dependencies
- [ ] Use dynamic imports
- [ ] Tree-shake unused code
