# Testing Skill

## Overview
Comprehensive testing strategy to ensure code quality, reliability, and maintainability.

## Testing Types

### Unit Tests
Test individual functions and components in isolation.

**Tools**: Jest, Vitest

**When to use**:
- Testing utility functions
- Testing pure functions
- Testing component rendering logic

```typescript
describe('calculateTotal', () => {
  it('sums array of numbers', () => {
    expect(calculateTotal([1, 2, 3])).toBe(6);
  });

  it('returns 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });

  it('handles negative numbers', () => {
    expect(calculateTotal([10, -5, 3])).toBe(8);
  });
});
```

---

### Integration Tests
Test how multiple components/modules work together.

**Tools**: React Testing Library, Jest

**When to use**:
- Testing component interactions
- Testing API integration
- Testing form submissions

```typescript
describe('LoginForm', () => {
  it('submits form with valid credentials', async () => {
    render(<LoginForm />);
    
    userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password'), 'password123');
    userEvent.click(screen.getByRole('button', { name: 'Login' }));
    
    await waitFor(() => {
      expect(screen.getByText('Welcome!')).toBeInTheDocument();
    });
  });
});
```

---

### E2E Tests
Test complete user journeys across the application.

**Tools**: Cypress, Playwright

**When to use**:
- Testing critical user flows
- Testing cross-browser compatibility
- Testing real backend integration

```typescript
describe('User Registration Flow', () => {
  it('user can register and login', () => {
    cy.visit('/');
    cy.contains('Register').click();
    cy.get('input[name="email"]').type('newuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.contains('Register').click();
    
    cy.contains('Login successful').should('be.visible');
  });
});
```

---

## Testing Best Practices

### Write User-Centric Tests
Test what users see and do, not implementation details.

```tsx
// ✅ Good - test user interaction
render(<Button onClick={handleClick}>Click me</Button>);
userEvent.click(screen.getByRole('button', { name: 'Click me' }));
expect(handleClick).toHaveBeenCalled();

// ❌ Bad - testing implementation
expect(component.state.clicked).toBe(true);
```

---

### Test Happy Path and Error Cases
Cover success and failure scenarios.

```typescript
describe('API call', () => {
  it('fetches data successfully', async () => {
    // Test success case
  });

  it('handles network error', async () => {
    // Test error case
  });

  it('shows loading state', async () => {
    // Test loading state
  });

  it('retries on failure', async () => {
    // Test retry logic
  });
});
```

---

### Use Proper Assertions
Assert on visible output, not internal state.

```typescript
// ✅ Good
expect(screen.getByText('Success')).toBeInTheDocument();
expect(input).toHaveValue('test@example.com');
expect(button).toBeDisabled();

// ❌ Bad
expect(component.state.success).toBe(true);
expect(component.instance.value).toBe('test@example.com');
```

---

### Keep Tests Isolated
Each test should be independent and not rely on others.

```typescript
// ✅ Good - setup/teardown
beforeEach(() => {
  // Reset state before each test
  store.clear();
  render(<App />);
});

// ❌ Bad - tests depend on order
test('first'); // Sets up state
test('second'); // Relies on first test's state
```

---

### Test Coverage Goals
- Critical business logic: 100%
- Component rendering: 80%+
- Utility functions: 80%+
- General code: 70%+

---

## Testing Checklist

- [ ] Happy path is tested
- [ ] Error cases are tested
- [ ] Edge cases are tested
- [ ] User interactions work
- [ ] Async operations complete
- [ ] Error messages display
- [ ] Loading states show
- [ ] Components mount/unmount correctly
- [ ] Props validation works
- [ ] Accessibility standards met
- [ ] Performance acceptable
- [ ] No console errors/warnings

---

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test Button.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="login"
```

---

## Debugging Tests

```typescript
// Log rendered DOM
screen.debug();

// Log specific element
screen.debug(element);

// Use testing playground
screen.logTestingPlaygroundURL();

// Wait with timeout
await waitFor(() => {
  expect(element).toBeInTheDocument();
}, { timeout: 3000 });
```
