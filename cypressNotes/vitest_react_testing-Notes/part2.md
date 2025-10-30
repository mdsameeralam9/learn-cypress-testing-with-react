# source
 - https://www.youtube.com/watch?v=hX22rXIExIc
 - 
This document provides comprehensive notes drawn exclusively from the provided excerpts of the "React testing library cheatsheet.pdf," detailing the setup, core concepts, functions, and best practices for testing React components using Vitest and React Testing Library (RTL).

***

## React Testing Library (RTL) & Vitest Cheatsheet Notes

The cheatsheet provides a complete guide for React developers looking to effectively test their components, covering installation, core functions, queries, asynchronous testing, and examples.

### I. Core Philosophy and Functionality

**RTL Focus:** React Testing Library focuses on testing components **from the user's perspective**. This means testing what the user sees and interacts with, rather than internal component implementation.

**Best Practices:**

*   **Simulate real user interactions** using `userEvent`.
*   **Prefer accessible queries** like `getByRole` or `getByLabelText` over `getByTestId`.
*   **Do not test implementation details** (e.g., avoid testing the internal logic of `useState` or `useEffect`).
*   Always assert what is **visible or accessible to users**.

**How Vitest + RTL Work Together (Under the Hood):**

*   **Vitest (Test Runner):** Runs tests in a Node.js environment. It uses **jsdom** to simulate the Document Object Model (DOM). Vitest supports ESM, fast re-runs, TypeScript, and snapshot testing.
*   **RTL (Interaction Tools):** Queries DOM elements (e.g., by role, label, or placeholder) as a user would.

### II. Installation and Setup

#### 1. Installation

Install the following packages as development dependencies (`-D`) for a React + Vite project:

*   `vitest`
*   `jsdom`
*   `@testing-library/react`
*   `@testing-library/jest-dom` (for DOM interactions)
*   Optional: `@testing-library/user-event` (for high-level user simulation).

#### 2. Configuration

**`vite.config.ts` Setup:**

The configuration file must include a `test` object with specific settings:

```javascript
// Example settings in vite.config.ts
test: {
    environment: 'jsdom', // essential for DOM APIs
    globals: true, // allows global access to describe, it, expect
    setupFiles: './setupTests.ts', // points to setup file
},
```

**`setupTests.ts`:**

This file is necessary to import the extensions for DOM assertions:

```javascript
// Example setupTests.ts
import '@testing-library/jest-dom'
```

### III. Core Test Functions

| Function | Source | Usage |
| :--- | :--- | :--- |
| **`describe`** | `vitest` | Groups related test cases into a suite (e.g., `describe('Button Component', ...)`). |
| **`it`** or **`test`** | `vitest` | Defines a single, distinct test case. |
| **`expect`** | `vitest` | Used for assertions to validate the output (e.g., `expect(...).toBeInTheDocument()`). |

**Utilities:**

*   **`render()`**: Renders a React component into the testing DOM (e.g., `render (<MyComponent />)`).
*   **`screen`**: Provides direct access to the rendered DOM without requiring destructuring from `render()`.
*   **`screen.debug()`**: Used for debugging, printing the virtual DOM to the console.

### IV. Query Types and Methods

The `screen` API allows querying elements based on what is visible or accessible to the user.

#### A. Query Prefixes (Base Queries)

The prefix determines the expected number of matches and how errors are handled:

| Prefix | Behavior | Throws Error On Not Found | Throws Error On Multiple Match | Asynchronous |
| :--- | :--- | :--- | :--- | :--- |
| **`getBy*`** | Expects exactly one match. | **Yes** | **Yes** | No |
| **`getAllBy*`** | Expects multiple matches. Fails if none are found. | **Yes** | No | No |
| **`queryBy*`** | Expects 0 or 1 match. Returns `null` if none found. | **No** | **Yes** | No |
| **`queryAllBy*`** | Expects 0 or more matches. Returns an empty array if none. | No | No | No |
| **`findBy*`** | Expects 1 match after an async update (waits for timeout). | **Yes** (after timeout) | **Yes** | **Yes** |
| **`findAllBy*`** | Expects multiple matches after an async update. | **Yes** (after timeout) | No | **Yes** |

#### B. Common Query Methods

These methods are used in combination with the prefixes (e.g., `getByRole`, `queryByText`):

| Query Method | Description |
| :--- | :--- |
| `byRole` | Accessible role (e.g., button, heading). **Preferred query method**. |
| `byLabelText` | Associated label (critical for input forms). |
| `byPlaceholderText` | Placeholder value. |
| `byText` | Visible text content. |
| `byAltText` | Text content for images. |
| `byTestId` | Uses the `data-testid` attribute (less preferred). |

### V. Asynchronous Testing Utilities

These utilities handle dynamic or time-dependent interactions:

*   **`waitFor`**: Used to wait for a condition or assertion to become true, typically following a state update or data fetch.
    ```javascript
    await waitFor(() => {
        expect(screen.getByText('Loaded')).toBeInTheDocument()
    })
    ```
*   **`findBy...`**: A shortcut for awaiting `waitFor(() => getBy...)`. It handles the asynchronous wait implicitly.
*   **`act`**: Used to wrap updates to components (like user events or timers) to ensure all side effects are processed before assertions are run.

### VI. Simulating User Interaction

Testing interactivity ensures components respond correctly to user input:

*   **`fireEvent`**: A low-level API for simulating DOM events (e.g., `fireEvent.click(button)`).
*   **`userEvent`**: A high-level API preferred for simulating realistic user interactions (e.g., `await userEvent.type(input, 'Hello')`). Note that interactions with `userEvent` are typically awaited.

### VII. Mocking and Cleanup

#### Mocking Functions

When testing components that rely on external functions (like API calls), those functions must be mocked.

*   **Mocking Implementation:** Functions are mocked using `vi.fn()` (provided by Vitest).
*   **Mocking `fetch`:** The global `fetch` can be mocked to control the API response received by the component. The mock should return a Promise that resolves with a simulated response object.

#### Cleanup

While RTL often handles automatic cleanup, manual cleanup can be implemented using the `cleanup` function imported from `@testing-library/react`:

```javascript
import { cleanup } from '@testing-library/react'
afterEach(() => {
    cleanup()
})
```

### VIII. Example Scenarios (Demonstrating Usage)

1.  **Rendering and Text Check (Simple Component):**
    ```javascript
    it('renders the button', () => {
        render (<button>Click Me</button>)
        expect(screen.getByText('Click Me')).toBeInTheDocument()
    })
    ```

2.  **User Typing (Input Handling):**
    *   Find the input using a query like `getByPlaceholderText`.
    *   Use `userEvent.type` to simulate typing.
    *   Assert the value using `toHaveValue`.

3.  **State Update on Click:**
    *   Render the component (e.g., a counter).
    *   Find and await the click action using `userEvent.click(button)`.
    *   Assert the updated state is reflected in the DOM (e.g., `expect(screen.getByText('Count: 1')).toBeInTheDocument()`).

4.  **Async Fetch Result:**
    *   Globally mock `fetch` to return a controlled resolved promise (e.g., returning 'Hello').
    *   Render the component that calls `fetch` (e.g., using `useEffect`).
    *   Use the asynchronous `await screen.findByText('Hello')` to wait for the data to appear in the DOM after the mock resolves.