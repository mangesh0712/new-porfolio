# Accessibility Skill

## Overview
Ensure the application is usable by everyone, including people with disabilities.

## WCAG 2.1 Standards

### Level A (Must Have)
- Keyboard accessible
- Proper color contrast
- Text alternatives for images
- Proper heading hierarchy

### Level AA (Should Have)
- Minimum 4.5:1 contrast ratio
- Resizable text
- No flashing/seizure triggers
- Descriptive link text

### Level AAA (Nice to Have)
- Enhanced contrast (7:1)
- Sign language for videos
- Extended audio descriptions

---

## Core Accessibility Principles

### 1. Perceivable
Users can see, hear, or perceive content.

```tsx
// ✅ Good - image has alt text
<img src="hero.jpg" alt="Team collaborating on project" />

// ✅ Good - video has captions
<video controls>
  <source src="video.mp4" type="video/mp4" />
  <track kind="captions" src="captions.vtt" />
</video>

// ❌ Bad - no alt text
<img src="hero.jpg" />
```

---

### 2. Operable
Users can navigate using keyboard.

```tsx
// ✅ Good - semantic button is keyboard accessible
<button onClick={handleClick}>Submit</button>

// ✅ Good - custom button is keyboard accessible
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Submit
</div>

// ❌ Bad - not keyboard accessible
<div onClick={handleClick}>Submit</div>
```

---

### 3. Understandable
Content is clear and predictable.

```tsx
// ✅ Good - clear labels and instructions
<label htmlFor="email">Email Address</label>
<input id="email" type="email" required />

// ✅ Good - error messages are clear
<p role="alert" className="error">
  Please enter a valid email address
</p>

// ❌ Bad - unclear labels
<input placeholder="E" />
```

---

### 4. Robust
Code works across assistive technologies.

```tsx
// ✅ Good - proper HTML semantics
<header>Navigation</header>
<main>Main content</main>
<footer>Footer</footer>

// ✅ Good - proper ARIA roles
<div role="navigation" aria-label="Main navigation">
  {/* navigation items */}
</div>

// ❌ Bad - no semantic meaning
<div className="header">Navigation</div>
<div className="main">Main content</div>
```

---

## Semantic HTML

Use native elements whenever possible.

```tsx
// ✅ Good - semantic elements
<header>Header</header>
<nav>Navigation</nav>
<main>Main content</main>
<article>Article</article>
<section>Section</section>
<footer>Footer</footer>
<button>Click me</button>
<a href="#">Link</a>
<form>Form</form>
<label htmlFor="input">Label</label>
<input id="input" />

// ❌ Bad - div-based (loses semantics)
<div className="header">Header</div>
<div onClick={() => {}}>Click me</div>
<div className="link">Link</div>
```

---

## ARIA Attributes

Use ARIA when semantic HTML isn't sufficient.

```tsx
// ✅ Good - ARIA labels
<button aria-label="Close menu">✕</button>
<div role="alert" aria-live="polite">{message}</div>
<div aria-expanded={isOpen} aria-controls="menu">Toggle</div>

// ✅ Good - ARIA descriptions
<input aria-describedby="hint" />
<p id="hint">Must be at least 8 characters</p>

// ❌ Bad - missing ARIA
<button>✕</button> {/* What does this do? */}
<div>{errorMessage}</div> {/* How is this announced? */}
```

---

## Form Accessibility

```tsx
// ✅ Good - accessible form
<form>
  <div>
    <label htmlFor="name">Full Name</label>
    <input id="name" type="text" required aria-required="true" />
  </div>
  
  <div>
    <label htmlFor="email">Email</label>
    <input id="email" type="email" aria-describedby="email-hint" />
    <p id="email-hint">We'll never share your email</p>
  </div>
  
  <fieldset>
    <legend>Preferred Contact Method</legend>
    <label>
      <input type="radio" name="contact" value="email" />
      Email
    </label>
    <label>
      <input type="radio" name="contact" value="phone" />
      Phone
    </label>
  </fieldset>
  
  <button type="submit">Submit</button>
</form>
```

---

## Color & Contrast

```tsx
// ✅ Good - sufficient contrast (4.5:1+)
<div style={{ color: '#1a1a1a', backgroundColor: '#ffffff' }}>
  High contrast text
</div>

// ❌ Bad - insufficient contrast
<div style={{ color: '#999999', backgroundColor: '#aaaaaa' }}>
  Low contrast text
</div>

// Use tools to check: https://webaim.org/resources/contrastchecker/
```

---

## Focus Management

```tsx
// ✅ Good - visible focus indicator
input:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

// ✅ Good - focus trap in modal
const Modal = () => {
  const firstButtonRef = useRef(null);
  const lastButtonRef = useRef(null);
  
  useEffect(() => {
    firstButtonRef.current?.focus();
  }, []);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstButtonRef.current) {
        lastButtonRef.current?.focus();
      } else if (!e.shiftKey && document.activeElement === lastButtonRef.current) {
        firstButtonRef.current?.focus();
      }
    }
  };
  
  return (
    <div onKeyDown={handleKeyDown}>
      <button ref={firstButtonRef}>First</button>
      <button ref={lastButtonRef}>Last</button>
    </div>
  );
};
```

---

## Testing Accessibility

```bash
# Install tools
npm install --save-dev @testing-library/jest-dom axe-core

# Test in component
import { axe } from 'jest-axe';

it('should not have accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Accessibility Checklist

- [ ] Keyboard navigation works
- [ ] Color contrast sufficient (4.5:1+)
- [ ] Focus indicators visible
- [ ] Images have alt text
- [ ] Forms have labels
- [ ] Error messages announced
- [ ] Headings in order
- [ ] No flashing content
- [ ] ARIA used correctly
- [ ] Tested with screen reader
- [ ] Tested with keyboard only
- [ ] No accessibility violations

---

## Resources

- [WebAIM](https://webaim.org/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Accessible Components](https://www.a11y-101.com/)
