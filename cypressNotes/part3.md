

### III. Command Line Interface (CLI) Runs

#### A. Importance of the Command Line Interface (CLI)
CLI is crucial in automation tools and projects.
*   It makes test executions easier, faster, and more efficient.
*   It uses significantly less memory because no GUI is involved (headless execution).
*   CLI commands are essential for integrating project executions with external processes, particularly within a **CI/CD pipeline**. A CI/CD pipeline allows chaining various development and deployment stages (dev environment, QA verification, deployment to QA, subsequent environments, and finally production) using automatic triggers.

#### B. Running Cypress Tests from CLI
The core command to run Cypress tests is **`npx cypress run`**.
*   The prefix `npx` is used when running the command from a local project folder.
*   Running this command executes **all spec files** (all tests) found in the `e2e` folder (or the `integration` folder in versions before Cypress 10).
*   **Default Execution Environment:** If no browser is specified, execution runs on **Electron**, which is a **headless browser** (no visible physical browser).

#### C. Run Results and Artifacts
After execution, a complete results table is shown on the terminal. The table details include:
*   Specs run and time taken per spec file.
*   Total number of tests (passed, failed, pending, skipped).
*   **Screenshots:** A `screenshots` folder is created, storing screenshots for all test cases where a failure occurred.
*   **Video Recording:** A `video` folder is created containing video recordings of the test runs, which can be viewed using any video player.

#### D. Cypress Run Options
To see all available options, use `npx cypress run -h` or `--help`. Commonly used options include:

| Option | Syntax | Purpose | Example |
| :--- | :--- | :--- | :--- |
| **Browser** | `-b` or `--browser` | Specifies the browser to run on (e.g., `chrome`). | `npx cypress run --browser chrome` |
| **Spec** | `-s` or `--spec` | Runs only a specific spec file, requiring the relative path to the file. | `npx cypress run -s cypress/e2e/file_name.cy.js` |
| **Config** | `-c` or `--config` | Overrides configuration values (e.g., `pageLoadTimeout`, `watchForFileChanges`). Multiple configurations are separated by commas. | `npx cypress run -c pageLoadTimeout=100000` |

Configurations can also be provided as a **stringified JSON format** for complex or multiple settings, enclosed in single quotes and curly brackets.

#### E. Running Tests via `package.json` Scripts
The `package.json` file contains a **`scripts` section** where commands can be defined and given a name.
*   To run a script, use the command **`npm run <script_name>`**.
*   Example: A script named `"cy-test": "cypress run"` can be executed via `npm run cy-test`, which runs all Cypress tests.
*   **Pre- and Post-Test Hooks:** Inbuilt keywords like **`pre-test`** and **`post-test`** can be used in the `scripts` section. When **`npm run test`** is executed, the `pre-test` script runs first, followed by the actual `test` script, and finally the `post-test` script. This is useful for running setup or cleanup tasks like generating reports.

#### F. Other Cypress Utility Commands
| Command | Purpose |
| :--- | :--- |
| `npx cypress open` | Opens the Cypress application GUI. |
| `npx cypress verify` | Checks if Cypress is correctly installed and executable. |
| `npx cypress version` | Displays the version of the Cypress package, binary, Electron, and Node. |
| `npx cypress info` | Prints detailed information about Cypress and the current environment, including detected browsers and proxy settings. |
| `npx cypress cache list` | Shows all Cypress versions that have been used on the system. |
| `npx cypress cache path` | Shows the file path where the Cypress cache is stored. |
| `npx cypress cache clear` / `prune` | Deletes the cached binaries (`prune` deletes all except the last/currently used version). |

***

### IV. The `package.json` and `package-lock.json` Files

#### A. `package.json` Structure and Significance
**`package.json`** is a critical file found in the root folder of every Node.js project, created using `npm init` or `npm init -y`.

**Contents and Rules:**
*   **Name:** The project name (used for npm registry registration). Must be a maximum of 214 characters, cannot start with a dot or underscore, and cannot contain uppercase letters.
*   **Version:** The project version number. The name and version form a unique combination.
*   **Description:** General description of the package.
*   **Main:** The entry point file that starts the project.
*   **Scripts:** Section for defining commands (as noted in Section III. E).
*   **Keywords:** Array of strings (tags) that help identify the package in npm search.
*   **Author/License:** Information on the author and how the project may be used. The default license is ISC (Internet System Consortium), a permissive free software license.
*   **Dependencies:**
    *   **`dependencies`:** Required dependencies for the project to run.
    *   **`devDependencies`:** Dependencies used only during the development or build phase.
*   **Installation:** Running `npm install` reads this file to install all listed dependencies. This makes setting up the project on a new machine easier.
    *   `npm install` installs both dependency types.
    *   `npm install --dev` installs only `devDependencies`.
    *   `npm install --prod` installs only `dependencies`.

**Version Matching Symbols in Dependencies:**
The file records the minimum version needed using symbols like `^` and `~`:
*   **Twiddle (`~`):** Matches all patch versions. E.g., `~1.2.3` matches `1.2.x`, but not `1.3.0`.
*   **Carrot (`^`):** Matches non-major versions. E.g., `^1.2.3` matches `1.x.x` (including `1.3.0`), but holds off on the next major version (e.g., `2.0.0`).

#### B. `package-lock.json`
*   This file records the **exact version** of every installed package.
*   It preserves the specific original version used when a library was installed, whereas `package.json` might allow for later versions based on the `^` or `~` symbols.
*   **`npm ci`** (clean install) command installs dependencies specifically based on the versions recorded in `package-lock.json`.
*   **Requirement:** `package.json` is always necessary, while `package-lock.json` provides optional, extra information for locking versions.

***

### V. File Handling with Cypress

Cypress provides methods for reading and writing files.

#### A. Reading Files

**1. Using `cy.fixture()`**
This method works best for files located under the built-in **`cypress/fixtures` folder**.
*   If the file is directly in the `fixtures` folder, it can be referenced by name alone (e.g., `example.json`).
*   If the file is a JSON file and is in the fixture folder, it can be referenced without the extension (e.g., just `example`).
*   **Chaining:** The `then()` function is used to chain operations and capture the yielded output (the content of the file).
    ```javascript
    cy.fixture('example.json').then(data => {
        // data contains the file content
        cy.log(data.name); // Accessing key/value pairs in JSON
    });
    ```
*   **Using Hooks:** File content can be loaded once in a `before` function using an alias (`.as('test_data')`). The data can then be accessed within any test case in that spec file using the `this` keyword (e.g., `this.test_data.name`).
*   **JSON Keys:** For JSON files, the `.its()` function can be used to access values directly via keys.

**2. Using `cy.readFile()`**
This function is used for reading files when they are not necessarily located in the `fixtures` folder, requiring a **relative location**.
*   It is best practice to use a relative location starting from the project root (e.g., `./cypress/fixtures/example.json`).
*   It is recommended to use single forward slashes (`/`) in the path for compatibility across operating systems (Windows, Linux, Mac).
*   **Usage:** Similar to `cy.fixture()`, the `then()` function is used for chaining to access the file data.

#### B. Writing Files using `cy.writeFile()`
The **`cy.writeFile()`** function is used to write data to a file.
*   If only the file name is provided (e.g., `sample.txt`), the file is created in the root project folder. Relative paths can be used to define a specific output location.
*   **Overwriting:** By default, if the function is called multiple times on the same file, the content is **overwritten**.
*   **Appending:** To add data to the existing file content (append), a flag must be provided:
    ```javascript
    cy.writeFile('file_name.txt', 'new data', { flag: 'a+' });
    ```
*   To ensure appended text starts on a new line, use the newline escape sequence (`\n`) at the end of the written statement.