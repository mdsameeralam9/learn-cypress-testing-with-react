## sources 
  - https://automationstepbystep.com/

The following notes detail the prerequisites and the step-by-step process for setting up and using Cypress with TypeScript, based on the provided video transcript excerpts:

### Prerequisites and Tools

- **Integrated Development Environment (IDE):** An IDE is required, with Visual Studio Code (VS Code) being the choice demonstrated.
  - VS Code includes **support for JavaScript and TypeScript**. If TypeScript support is missing, it can be installed via the Extensions section.
  - The **Code Runner plugin** is recommended for VS Code as it helps run the code directly.
- **Node.js and npm:**
  - **Node.js** is necessary. Its version can be checked in the terminal or command prompt using `node -v` or `node --version`.
  - **npm (Node Package Manager)** comes bundled with Node.js and can also be checked using a version command (implied).
  - If Node.js is not found, installation instructions are available in the APM playlist on the `automationstepbystep.com` website.

---

### Step-by-Step Setup: Cypress with TypeScript

The setup process focuses on creating a clean, local Node project where dependencies are maintained within the project folder.

#### Step 1 & 2: Project Folder Setup

1.  **Create a New Folder** on the system (e.g., `cyprus with typescript`).
2.  **Open the Folder in VS Code** (or the chosen editor). This can be done via the File menu or by using the command line within the folder (`cmd` followed by `code [folder name]`).

#### Step 3: Initializing the Project and Installing Dependencies

1.  **Open the Terminal** in VS Code (using `Ctrl` and the backtick key).
2.  **Initialize a Node Project:** Run the command **`npm init -y`**.
    - This command initializes the project, agreeing to all default answers (`-y`).
    - It creates a **`package.json`** file, which manages all project dependencies. The goal is to install all dependencies locally, ensuring the project is easily portable.
3.  **Install Cypress:** Run the command **`npm install cypress`**.
    - This adds Cypress locally and creates a `dependency` section in `package.json` listing the installed version.
4.  **Install TypeScript:** Run the command **`npm install typescript`**.
    - This adds TypeScript dependency to `package.json`. (Cypress and TypeScript can alternatively be installed together in one command).

#### Step 4: Configuring TypeScript

1.  **Initialize `tsconfig.json`:** Run the command **`npx tsc --init --types cypress lib dom es6`**.
    - This command initializes the required `tsconfig.json` file.
    - The parameters ensure that **Cypress types are accessible by TypeScript**.
    - The `lib` option (`dom` and `es6`) is passed because Cypress types depend on these libraries.
    - The resulting file specifies configurations like the target version and libraries, and notably adds types for Cypress.

#### Step 5: Opening Cypress

1.  **Open the Cypress UI:** Run the command **`npx cypress open`**.
    - `npx` must be used because the npm package command is being executed locally.
    - Opening the UI **creates the Cypress project structure**.

### Cypress Project Structure and Test Creation

When Cypress opens, it creates a structure, including the `cypress` folder.

- **`integration` folder:** This is the directory where all test files (spec files) must be written. Example files are initially provided but are often deleted.
- **`node_modules` folder:** Contains all the locally maintained project dependencies and packages.

#### Step 6 & 7: Writing and Running a TypeScript Test

1.  **Create a Test File:** Inside the `integration` folder, create a new file with the **`.ts` extension** (e.g., `basic.ts`).
2.  **Structure the Test:** Cypress utilizes the **Mocha tester framework** format, typically using the `it` block.
3.  **Write Cypress Commands:** Cypress commands begin with the keyword **`cy`**.
    - **Visiting a page:** Use `cy.visit('URL')`.
    - **Selector Identification:** The **Selector Playground** can be opened from the Cypress UI to hover over elements and generate `cy.get()` commands.
    - **Getting Elements:** `cy.get()` is used to locate elements, often using CSS selectors (e.g., class names starting with a dot, or attributes in square brackets).
    - **Typing/Interacting:** Commands can be chained (e.g., `.type()`).
      - Typing text: `.type('text to input')`.
      - Hitting special keys (like Enter): `.type('{enter}')`.
4.  **Run the Test:** After saving the `.ts` file, the execution starts automatically or can be initiated by selecting the file in the Cypress UI.

Cypress provides **built-in commands**, and users can also create their own **custom commands** in a TypeScript file.
