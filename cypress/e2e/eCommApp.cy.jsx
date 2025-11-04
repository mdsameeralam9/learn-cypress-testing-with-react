// cypress/e2e/login.cy.ts
describe("Login page", () => {
  const email = "emily.johnson@x.dummyjson.com";
  const goodPass = "emilyspass"; // maps to username "emilys" via emailToUsername
  const badPass = "wrongpass";

  beforeEach(() => {
    // If your app uses client-side routing, ensure baseUrl is set in cypress.config
    cy.visit("http://localhost:5173/"); // component route
  });

  it("renders form and controls", () => {
    cy.contains("h2", "Login").should("be.visible"); // heading by text [web:1]
    cy.get('input[name="email"]').should("have.attr", "type", "email"); // by attribute [web:22]
    cy.contains('input', 'email_Input').should("be.visible")
    cy.get('input[name="password"]').should("have.attr", "type", "password"); // by attribute [web:22]
    cy.contains("button", "Sign in").should("be.enabled"); // button by text [web:1]
  });

  it("validates required fields via HTML5 and custom error", () => {
    cy.contains("button", "Sign in").click(); // submit [web:1]
    cy.contains("Email and password are required.").should("be.visible"); // error banner [web:1]
  });

  it("shows email pattern helper on invalid email", () => {
    cy.get('input[name="email"]').type("invalid-email"); // invalid format [web:22]
    cy.get('input[name="password"]').type("123456"); // meets minLength [web:22]
    cy.contains("button", "Sign in").click(); // submit [web:1]
    // HTML5 validation prevents form submit; helper appears via peer invalid styles
    cy.contains("Please enter a valid email address.").should("be.visible"); // helper [web:1]
  });

  it("toggles password visibility", () => {
    cy.get('input[name="password"]').type("123456"); // type password [web:22]
    cy.contains("button", "Show").click(); // toggle by text [web:1]
    cy.get('input[name="password"]').should("have.attr", "type", "text"); // visible [web:22]
    cy.contains("button", "Hide").click(); // toggle back [web:1]
    cy.get('input[name="password"]').should("have.attr", "type", "password"); // hidden [web:22]
  });

  it("disables submit and shows loading text while logging in", () => {
    cy.intercept("POST", "https://dummyjson.com/auth/login", (req) => {
      // delay to observe loading state
      req.reply((res) => {
        res.delay = 300;
        res.send({
          statusCode: 200,
          body: { accessToken: "test-token" },
        });
      });
    }); // network stub [web:16]

    cy.get('input[name="email"]').type(email); // attribute selector [web:22]
    cy.get('input[name="password"]').type(goodPass); // attribute selector [web:22]
    cy.contains("button", "Sign in").click(); // submit [web:1]
    cy.contains("button", "Signing in...").should("exist"); // loading label [web:1]
    cy.contains("button", "Signing in...").should("be.disabled"); // disabled state [web:1]
  });

  it("logs in successfully and navigates to products", () => {
    cy.intercept("POST", "https://dummyjson.com/auth/login", {
      statusCode: 200,
      body: { accessToken: "test-token" },
    }).as("login"); // stub ok [web:16]

    cy.get('input[name="email"]').type(email); // fill [web:22]
    cy.get('input[name="password"]').type(goodPass); // fill [web:22]
    cy.contains("button", "Sign in").click(); // submit [web:1]

    cy.wait("@login")
      .its("request.body")
      .should((body) => {
        expect(body).to.have.property("username", "emilys"); // mapping check [web:16]
        expect(body).to.have.property("password", goodPass); // request payload [web:16]
      }); // assert payload [web:16]

    // token stored and redirected
    cy.window().its("localStorage.accessToken").should("eq", "test-token"); // storage [web:16]
    cy.location("pathname").should("eq", "/products"); // navigation [web:16]
  });

  it("shows server error on bad credentials", () => {
    cy.intercept("POST", "https://dummyjson.com/auth/login", {
      statusCode: 401,
      body: { message: "Invalid credentials" },
    }).as("loginFail"); // stub error [web:16]

    cy.get('input[name="email"]').type("someone@example.com"); // maps to kminchelle [web:22]
    cy.get('input[name="password"]').type(badPass); // fill [web:22]
    cy.contains("button", "Sign in").click(); // submit [web:1]

    cy.wait("@loginFail"); // wait stub [web:16]
    cy.contains("Invalid credentials").should("be.visible"); // error banner [web:1]
    cy.location("pathname").should("eq", "/login"); // stays on login [web:16]
  });

  it("handles network error gracefully", () => {
    cy.intercept("POST", "https://dummyjson.com/auth/login", {
      forceNetworkError: true,
    }).as("netErr"); // network fail [web:16]

    cy.get('input[name="email"]').type(email); // fill [web:22]
    cy.get('input[name="password"]').type(goodPass); // fill [web:22]
    cy.contains("button", "Sign in").click(); // submit [web:1]

    cy.contains("Network error. Please try again.").should("be.visible"); // error text [web:1]
    cy.location("pathname").should("eq", "/login"); // no redirect [web:16]
  });
});
