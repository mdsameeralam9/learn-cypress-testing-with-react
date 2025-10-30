This document provides complete notes drawn from the provided cheatsheet for Vitest and React Testing Library (RTL).

## Overview

The cheatsheet is designed for React developers who want to test their components effectively using Vitest and React Testing Library (RTL). It covers installation, core testing functions, queries, asynchronous testing, and best practices.

***

## 1. Installation

To install Vitest and React Testing Library for a React + Vite project, run:
`npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom`

An optional dependency for simulating higher-level user interactions is:
`npm install -D @testing-library/user-event`

### `vite.config.ts` Setup
The configuration file requires specific settings for testing:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom', // important for DOM APIS
        globals: true, // for global describe/it/expect etc.
        setupFiles: './setupTests.ts', // for jest-dom etc.
    },
})
```
*   **`environment: 'jsdom'`** is crucial for handling DOM APIs.
*   **`globals: true`** allows for global access to core functions like `describe`, `it`, and `expect`.

### `setupTests.ts`
This file is used to import `jest-dom` extensions:
```typescript
import '@testing-library/jest-dom'
```

***

## 2. How Vitest + RTL Work Together Under the Hood

### Vitest
*   Vitest runs tests in Node.js.
*   It uses **jsdom to simulate the DOM**.
*   It supports ESM, fast re-runs, type-safe (TypeScript support), and snapshot testing.
*   It compiles tests like Vite and runs in a Vite-like development environment.

### React Testing Library (RTL)
*   RTL focuses on **testing components from the user's perspective**.
*   It queries DOM elements the way a user would (e.g., by role, label, or placeholder).
*   It encourages using real user interactions rather than testing internal component logic.

***

## 3. Core Test Functions

| Function | Purpose | Example | Source |
| :--- | :--- | :--- | :--- |
| **`describe`** | Groups related tests. | `describe('Button Component', () => { ... })` | |
| **`it`** (or **`test`**) | Defines a single test case. | `it('should render a button', () => { // test logic })` | |
| **`expect`** | Assertions used to validate the output. | `expect(screen.getByRole('button')).toBeInTheDocument()` | |

***

## 4. Screen & Query Types

### `screen`
The `screen` object provides access to the DOM rendered by RTL without needing destructuring (after calling `render (<MyComponent />)`).

### Common Queries

These queries are used to find specific elements in the DOM:

| Query | Description | Source |
| :--- | :--- | :--- |
| `getByRole` | Accessible role (e.g., button, heading). | |
| `getByLabelText` | Associated label (for input forms). | |
| `getByPlaceholderText` | Placeholder value. | |
| `getByText` | Visible text content. | |
| `getByAltText` | Used for images. | |
| `getByTestId` | Uses the `data-testid` attribute. | |
| `getAllBy...` | Returns multiple elements. | |

### Query Type Summary

| Prefix | Use When | Behaviour | Async | Throws on Not Found | Throws on Multiple | Source |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`getBy*`** | Exactly one match expected. | Returns Element. Fails if 0 or multiple matches. | No | Yes | Yes | |
| **`getAllBy*`** | Multiple matches expected. | Returns Array of elements. Fails on 0 matches. | No | Yes | No | |
| **`queryBy*`** | 0 or 1 match expected. | Returns Element or `null` if none found (no error). | No | No | Yes | |
| **`queryAllBy*`** | 0 or more matches expected. | Returns an array (possibly empty). | No | No | No | |
| **`findBy*`** | 1 match expected after an async update (e.g., after fetch). | Returns `Promise<Element>`. | Yes | Yes (after timeout) | Yes | |
| **`findAllBy*`** | Multiple matches expected after an async update. | Returns `Promise<Array<Element>>`. | Yes | Yes (after timeout) | No | |

*Note: The `findBy...` query is a shortcut for `await waitFor(() => getBy...)`.*

***

## 5. Async Testing Utilities

### `waitFor`
This utility waits for a condition to become true, which is useful after operations like state updates or fetching data.
```javascript
await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument()
})
```

### `act`
The `act` utility is used to wrap updates to components, such as user events or timers. Although it is normally handled automatically, it must be used when required.
```javascript
await act(async () => {
    fireEvent.click(button)
})
```

***

## 6. Common Utilities

| Utility | Description | Example | Source |
| :--- | :--- | :--- | :--- |
| **`render()`** | Renders a React component into the testing DOM. | `render (<MyComponent />)` | |
| **`fireEvent`** | Low-level utility for simulating interactions. | `fireEvent.click(button)` | |
| **`userEvent`** | High-level utility for simulating real user interactions. | `await userEvent.type (input, 'Hello')`<br>`await userEvent.click(button)` | |

***

## 7. Example Test Cases

1.  **Simple Button Render**
    ```javascript
    it('renders the button', () => {
        render (<button>Click Me</button>)
        expect(screen.getByText('Click Me')).toBeInTheDocument()
    })
    ```

2.  **Input with User Typing**
    ```javascript
    it('accepts input text', async () => {
        render(<input placeholder="Name" />)
        const input = screen.getByPlaceholderText('Name')
        await userEvent.type (input, 'John')
        expect(input).toHaveValue('John')
    })
    ```

3.  **Button Click Updates State**
    This example tests a `Counter` component where a button click increments the count.
    ```javascript
    it('increments count on click', async () => {
        render(<Counter />)
        const button = screen.getByText('Click')
        await userEvent.click(button)
        expect(screen.getByText('Count: 1')).toBeInTheDocument()
    })
    ```

4.  **Async Fetch Result**
    This example mocks global fetch, renders a component that uses `useEffect` to fetch data, and uses `findByText` to assert the asynchronous result.
    ```javascript
    global.fetch = vi.fn(() => 
        Promise.resolve({ text: () => Promise.resolve('Hello') })
    ) as any

    it('renders fetched data', async () => {
        render (<FetchData />)
        expect(await screen.findByText('Hello')).toBeInTheDocument()
    })
    ```

***

## 8. Mocking Modules & Functions

*   **Mocking `fetch`:** Use `global.fetch = vi.fn(...)` to control the API response.
    *   *Example (JSON response):* `global.fetch = vi.fn(() => Promise.resolve({ json: () => Promise.resolve({ name: 'John' }) })) as any`.
*   **Mocking modules:** Functions within modules can be mocked using `vi.fn()`.
    *   *Example:* `getUser: vi.fn(() => Promise.resolve({ id: 1 }))`.

***

## 9. Cleanup
While automatic cleanup is handled by RTL, you can manually enforce cleanup after each test using:
```javascript
import { cleanup } from '@testing-library/react'
afterEach(() => {
    cleanup()
})
```

## 10. Debugging
Use `screen.debug()` to output the testing DOM structure.

## 11. Snapshot Testing (Optional)
Snapshot testing involves rendering a component and comparing its structure (`asFragment()`) to a stored snapshot.
```javascript
it('matches snapshot', () => {
    const { asFragment } = render (<Component />)
    expect(asFragment()).toMatchSnapshot()
})
```

***

## 12. Best Practices

*   **Prioritise accessibility queries:** Prefer **`getByRole`** and **`getByLabelText`** over less accessible methods like `getByTestId`.
*   **Simulate real interactions:** Use **`userEvent`** to simulate how a real user interacts with the application.
*   **Focus on user outcomes:** Always assert what is visible or accessible to users.
*   **Avoid implementation details:** Do not test internal component mechanisms such as `useState` or `useEffect` hooks.