## common methods
1. `cy.visit()` => Visits a URL => cy.visit('/login') 
2. `cy.get()` => Gets one or more DOM elements by CSS selector =>  cy.get('#username')|cy.get('.btn-submit')
3. `cy.contains()` => Gets a DOM element containing the specified text => cy.contains('Login') 
4. `cy.intercept()` => Stubs or intercepts a network request => cy.intercept('GET', '/api/users').as('getUsers')
5. `cy.wait()` => Waits for a network request to resolve or for a specified duration => cy.wait('@getUsers')|cy.wait(2000)
6. `cy.fixture()` => Loads data from a file in the cypress/fixtures folder => cy.fixture('user.json').as('userData') 
7. `cy.as()` => Creates an alias for a command or value => cy.get('#form').as('loginForm') 
8. `cy.mount()` => Mounts a component for testing => cy.mount(<MyComponent />) 

## Element interactions
Interactions include `.click()`, `.type()`, `.clear()`, `.check()`, `.uncheck()`, `.select()`, .dblclick(), .rightclick(), .focus(), .blur(), .trigger(), and `.submit()`. 

## Assertions
Use `.should()` or `.and()` with assertions like exist, `be.visible`, `have.text`, `contain`, `have.value`, be.checked, `have.length`, have.class, and `not.exist`.

## DOM traversal
These commands, such as .children(), .parent(), .closest(), .find(), .next(), .prev(), .first(), .last(), and .eq(), are used to navigate the DOM hierarchy. 

## Debugging
Commands for debugging include .debug(), cy.pause(), cy.log(), and .then(). 


## cy.get() 
describe('Cypress Element Selection Methods', () => {

  // Visit the application's base URL before each test
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  // --- 1. Select by Tag Name ---
  it('should select elements by their tag name', () => {
    cy.get('h1').should('contain', 'Todo App');
    cy.get('button').should('have.length.at.least', 1);
  });

  // --- 2. Select by ID ---
  it('should select an element by its ID', () => {
    // Note: The example HTML doesn't have an ID, but for demonstration:
    // Assuming an element like <form id="todo-form">
    // cy.get('#todo-form').should('exist');
  });

  // --- 3. Select by Class ---
  it('should select elements by their class name', () => {
    cy.get('.bg-blue-500').should('contain', 'Add');
    cy.get('.rounded-lg').should('have.length.at.least', 1);
  });

  // --- 4. Select by Attribute ---
  // --- 4a. By Exact Attribute Value ---
  it('should select an element by exact attribute value', () => {
    cy.get('input[name="textTodo"]').should('exist');
    cy.get('input[type="checkbox"]').should('exist');
  });

  // --- 4b. By data-* Attribute (Best Practice) ---
  it('should select an element using a data-* attribute', () => {
    // The provided code doesn't use a data- attribute, but this is the recommended approach.
    // Assuming an element like <button data-cy="add-button">Add</button>
    // cy.get('[data-cy="add-button"]').click();
  });

  // --- 4c. By Attribute Existence ---
  it('should select elements by the existence of an attribute', () => {
    // Get all elements with a "placeholder" attribute
    cy.get('[placeholder]').should('exist');
  });

  // --- 4d. By Partial Attribute Value ---
  it('should select elements by partial attribute value', () => {
    // Select an element where the placeholder starts with "Add"
    cy.get('[placeholder^="Add"]').should('have.attr', 'placeholder', 'Add a new todo...');
  });

  // --- 5. Select by Combination of Selectors ---
  it('should combine selectors for more specific selection', () => {
    cy.get('div.bg-white input.flex-1').should('have.attr', 'placeholder', 'Add a new todo...');
    cy.get('li.rounded-lg').should('exist');
  });

  // --- Other Cypress Commands for Selection ---
  it('should use other commands for refining selection', () => {
    // Using .find()
    cy.get('.shadow-md').find('input[type="text"]').should('exist');

    // Using cy.contains()
    cy.contains('Add a new todo...').should('be.visible');
    cy.contains('button', 'Add').click();

    // Using .within()
    cy.get('.shadow-md').within(() => {
      cy.get('input').type('First item');
      cy.get('button').contains('Add').click();
    });

    // Using .first(), .last(), .eq()
    cy.get('ul > li').first().should('contain', 'First item');
  });

});
