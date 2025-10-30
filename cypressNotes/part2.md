## 1. Assertions in Cypress

Assertions validate that application behavior matches expected outcomes.

### Implicit Assertions

- Auto-applied checks built into Cypress; no explicit call needed.
- Executed in the background before performing actions.
- Use the `should` command and can chain multiple conditions via `and`.

**Examples:**

- `should('contain', 'text')` → checks element text.
- `should('have.class', 'className')` → validates class attribute.
- `should('be.visible')`, `should('be.enabled')`, `should('be.disabled')`.
- `should('equal', 'value')` → compares attribute values.

### Explicit Assertions

- User-defined assertions for custom validation.
- Implemented using `expect` and `assert` commands.
- Shown in Cypress logs only on failure.

**`expect` Command:**

- Validates expressions (`expect(true).to.be.true`).
- Common checks: equality, type, truthy/falsy, existence, non-null.

**`assert` Command:**

- Syntax: `assert.equal(value1, value2, 'message')`
- `assert.strictEqual` ensures strict type match.
- Other checks: not equal, is above/below, true/false, is string/number.

---

## 2. Page Object Model (POM)

### Purpose

- Separates object locators and actions from test scripts.
- Enhances maintenance and code reusability.
- Avoids repetitive locator updates in multiple test cases.

### Implementation Steps

1. **Create Page Classes:** One class per application page (e.g., `LoginPage.js`).
2. **Define Functions:** Each function defines actions (e.g., `enterUsername`, `clickLogin`).
3. **Import and Instantiate:** Import page objects into tests and create instances.
4. **Call Functions:** Use instance methods in test cases.
5. **Separate Data:** Pass data (usernames/passwords) from tests, not hardcoded.
6. **Store Locators Separately:** Define locators inside classes using `this.` for reuse.

---

## 3. App Actions

- Modify app state **directly via backend interaction** (no manual UI steps).
- Used for **white-box testing** scenarios.
- Example: Changing login state variable to “true”.
- Requires **developer support** to expose these backend actions.
- Advantage: Reduces need for navigation or redundant POM actions.

---

## 4. Grouping Tests

### Using Mocha Structure

- `it()` defines individual test cases.
- Related tests are grouped within `describe()` blocks.
- Titles in describe blocks are shown as sections in the Cypress Test Runner.

### Selective Execution

- `.only` runs **only** that test (`it.only()`).
- `.skip` omits that test during execution (`it.skip()`).

### `beforeEach` Block

- Runs setup code **before every test**.
- **Inside describe:** applies to tests in that describe block.
- **Outside describe:** runs for all tests in the file.
- **In support files (Cypress v10+):**
  - Placed in `cypress/support/e2e.js`, runs before all tests globally.
- Use `cy.log('message')` to print custom logs to the command log.

---
