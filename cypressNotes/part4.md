These notes summarise the topics, setup procedures, and testing commands discussed in the provided sources, covering file upload, file download, and an introduction to reporting in Cypress.

***

## Complete Notes: Cypress Masterclass Topics

### I. Review of Previous Topics

The previous master class covered the following concepts:

*   **File Reading and Writing** in Cypress.
*   **Command Line Interface (CLI):** Running Cypress tests and using different options from the command line.
*   **`package.json`:** Understanding its contents and significance.
*   **`package-lock.json`** file.

### II. File Upload in Cypress

File upload uses a specific third-party utility package that adds custom Cypress commands.

#### A. Setup (Plugin Installation and Configuration)

1.  **Identify the Plugin:** Use the `cypress-file-upload` package (an npm project).
2.  **Installation:** Install the package using npm, preferably saving it as a dev dependency:
    ```
    npm install --save-dev cypress-file-upload
    ```
    This ensures the dependency is listed under `devDependencies` in `package.json`.
3.  **TypeScript Configuration (Optional):** If using Cypress with TypeScript, add `cypress-file-upload` to the `types` statement entry found under `compilerOptions` in the `tsconfig.json` file.
4.  **Add Custom Command:** Go to the `commands.js` file (located under the `cypress/support` folder). This file is used to add custom commands or overwrite existing ones. Add the necessary import statement for the plugin.
5.  **Import Verification:** Ensure that `commands.js` is imported:
    *   For Cypress versions 10 or above, check the `e2e.js` file under the `cypress/support` folder.
    *   For Cypress versions earlier than 10, check the `index.js` file under the `cypress/support` folder.

#### B. Test Creation (File Upload Test)

1.  **Create Test File:** Create a new test file (e.g., `file upload and download demo.cy.js`) in the `e2e` folder.
2.  **Reference Types (Optional):** Add reference types at the top of the test file for auto-completion of Cypress commands.
3.  **Visit Page:** Use `cy.visit()` to navigate to the web page containing the file upload functionality.
4.  **Locate Uploader:** Find the locator (selector) for the file upload button (e.g., "Choose File" or "Browse").
5.  **Perform Upload:** Use the custom command **`.attachFile()`** after locating the file browsing element:
    ```javascript
    cy.get('locator').attachFile('file_name');
    ```
6.  **File Location Rules**:
    *   If the file is directly under the **`fixtures` folder**, provide only the file name (e.g., `example.json`).
    *   If the file is in a subfolder under `fixtures`, provide the subfolder and file name.
    *   If the file is outside the `fixtures` folder but within the project, provide the relative or absolute path.
7.  **Successful Uploads:** The process demonstrated success using both a JSON file (`example.json`) and a copied image file (PNG) placed in the `fixtures` folder.

### III. File Download in Cypress

File downloading also requires a third-party plugin.

#### A. Setup (Plugin Installation and Configuration)

1.  **Identify the Plugin:** Use the `cypress-downloadfile` plugin.
2.  **Installation:** Install the package using npm:
    ```
    npm install cypress-downloadfile
    ```
    The package should then appear in `package.json`.
3.  **Add Custom Command:** Add the necessary code/import statement to the `commands.js` file (under the `support` folder).
4.  **Configuration for Cypress v10+**:
    *   If using Cypress version 10 or above, the following configurations must be added to the **`cypress.config.js`** file:
        *   Define a constant at the top: `const downloadFile = require('cypress-downloadfile');`.
        *   Add the task configuration (`on('task', downloadFile)`) inside the `setupNodeEvents` function.
    *   *(Note: For versions earlier than 10, configuration was done in `cypress/plugins/index.js`).*

#### B. Test Creation (File Download Test)

1.  **Reference Types (Optional):** Add `/// <reference types="cypress-downloadfile" />` to the test file for auto-suggestion/code completion for download commands.
2.  **Perform Download:** Use the command **`cy.downloadFile()`**, providing the file URL, the destination folder name, and the desired file name:
    ```javascript
    cy.downloadFile(link_for_file, folder_name, file_name);
    ```
3.  **Functionality:** This command gets the file from the provided link and saves it to a folder (e.g., `my downloads`) which it creates under the root project folder.

### IV. HTML Reporting in Cypress

Cypress can generate "really awesome" HTML reports using external libraries.

*   **Reporter Mentioned:** **Mochawesome Reporter** is recommended for easy integration.
*   **Capabilities:** Mochawesome facilitates generating reports, configuring reporting options, and merging multiple JSON report files into a single HTML report.
*   **Command Execution:** Commands used to generate reports can be added as scripts within the `scripts` section of the `package.json` file.
*   **Further Details:** The full details regarding the installation, configuration, merging processes, and troubleshooting common errors (such as "unexpected token in json file at position 0") are covered in a separate, dedicated video resource.