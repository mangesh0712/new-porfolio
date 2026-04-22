# Style Guide

## Tailwind CSS Standards

**Primary approach**: Use Tailwind utilities for all styling.

### Core Rules
- Use Tailwind first; custom CSS only for global styles or complex animations
- Never mix BEM classes with Tailwind in same component
- Extract repeated patterns to Tailwind `@apply` in global CSS
- Use Tailwind's spacing scale (4px base): `p-4` (16px), `m-2` (8px)
- Always use responsive prefixes: `md:`, `lg:`, `xl:` for breakpoints
- Group utilities logically: layout → sizing → spacing → colors → effects → hover
- Use arbitrary values sparingly: `w-[322px]` only when no Tailwind value fits
- Never hardcode colors; use Tailwind palette defined in `tailwind.config.js`

### Utility Organization Pattern
```tsx
// Order: Display/Layout → Sizing → Spacing → Colors → Effects → Hover
<div className="
  flex items-center justify-between
  w-full h-auto
  p-4 mb-6 gap-2
  bg-white text-gray-900
  rounded-lg shadow-sm
  hover:shadow-md transition-shadow
">
  Content
</div>
```

### App-Specific Patterns

**Dark mode**: Always include dark mode variants
```tsx
className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
```

**Section containers**
```tsx
className="min-h-screen w-full px-6 py-20"
```

**Cards**
```tsx
className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950"
```

**Grids**
```tsx
className="grid gap-6 md:grid-cols-3"
```

**Buttons/Interactive**
```tsx
className="rounded-lg p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
```

**Sidebar/Fixed layout**
```tsx
className="fixed left-0 top-0 h-screen w-60 flex-col"
```

**Navigation**
```tsx
className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200"
```

### Conditional Classes
```tsx
import clsx from 'clsx';

className={clsx(
  'base-styles',
  variant === 'primary' && 'primary-styles',
  disabled && 'disabled-styles'
)}
```

## Global CSS

Use `@apply` for repeated patterns in `styles/globals.css`:
```css
.card {
  @apply p-4 bg-white rounded-lg shadow-md border border-gray-200;
}

.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition;
}
```

## Formatting
- **Indent**: 2 spaces
- **Line Length**: 100 chars (soft), 120 chars (hard limit)
- **Quotes**: Single quotes for strings, double for JSX attributes
- **Semicolons**: Always use
- **Trailing Commas**: Use in multiline objects/arrays

## Naming Conventions
- **Components**: PascalCase (Button.tsx)
- **Utilities/Hooks**: camelCase (formatDate.ts)
- **CSS Classes**: kebab-case (.card, .card__title)
