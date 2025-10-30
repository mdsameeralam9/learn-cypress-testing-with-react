describe("Todo App E2E Tests", () => {
  const todoText = "Learn Cypress";
  const editedTodoText = "Master Cypress";

  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should display the header and initial empty state", () => {
    cy.get("h1").should("contain", "Todo App");
    cy.get("p").should("contain", "No todos yet. Add one above!");
  });

  // initial Data
  it('testing initial data at UI', () => {
    
  })

  it("should allow a user to add a new todo", () => {
    cy.get('input[name="textTodo"]').type(todoText);
    cy.get("button").contains("Add").click();
    cy.get("ul > li").should("have.length", 1).and("contain", todoText);
    cy.get("p").should("not.exist");
  });

  it("should allow a user to complete a todo", () => {
    cy.get('input[name="textTodo"]').type(todoText);
    cy.get("button").contains("Add").click();
    cy.get("ul > li").first().find('input[type="checkbox"]').check();
    cy.get("ul > li").first().find("span").should("have.class", "line-through");
  });

  it("should allow a user to edit an existing todo", () => {
    cy.get('input[name="textTodo"]').type(todoText);
    cy.get("button").contains("Add").click();
    cy.get("ul > li").first().contains("Edit").click();
    cy.get('input[name="textTodo"]').should("have.value", todoText);
    cy.get('input[name="textTodo"]').clear().type(editedTodoText);
    cy.get("button").contains("Add").click();
    cy.get("ul > li").first().find("span").should("contain", editedTodoText);
  });

  it("should allow a user to delete a todo", () => {
    cy.get('input[name="textTodo"]').type(todoText);
    cy.get("button").contains("Add").click();
    cy.get("ul > li").first().contains("Delete").click();
    cy.get("ul > li").should("not.exist");
    cy.get("p").should("contain", "No todos yet. Add one above!");
  });
});
