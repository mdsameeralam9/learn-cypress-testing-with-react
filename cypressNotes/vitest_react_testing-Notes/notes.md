# describe:

- describe creates a test suite (a group) that organizes related tests and scopes setup/teardown hooks; it/test define individual test cases inside or outside those suites.
- Groups related tests under one name so reports read like “ComponentName › behavior A/B”.
- Scopes hooks: beforeAll, beforeEach, afterEach, afterAll run only for tests inside that describe.
- Can be nested to reflect component/modules and specific features or states.

```jsdescribe('TodoList', () => {
beforeEach(() => {
  // runs before each test in this block
});

it('adds a todo', () => {
  // single test case
});

test('removes a todo', () => {
  // another test case (same as it)
});
});
```

# test and it

- both are same and “it” and “test” are the functions used to define an individual test case in Jest/Vitest;
