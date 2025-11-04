// cypress/component/TodoApp.cy.tsx
import React from 'react'
import { mount } from 'cypress/react' // or @cypress/react depending on setup
import TodoApp from './Todo'

describe('TodoApp (Component)', () => {
  const typeTodo = (text) => {
    cy.get('[data-testid="inputTodo"]').clear().type(text)
  }

  beforeEach(() => {
    mount(<TodoApp />) // mount component in isolation [web:42]
  })

  it('renders header, input and empty state', () => {
    cy.contains('h1', 'Todo App').should('be.visible') // heading by text [web:42]
    cy.get('[data-testid="inputTodo"]').should('exist').and('be.visible') // input exists [web:42]
    cy.contains('No todos yet. Add one above!').should('be.visible') // empty state [web:42]
  })

  it('adds a todo by clicking Add', () => {
    typeTodo('Buy milk')
    cy.contains('button', 'Add').click()
    cy.get('[data-testid="ulLits"] li').should('have.length', 1) // one item [web:42]
    cy.get('[data-testid="ulLits"] li').first().should('contain.text', 'Buy milk') // text present [web:42]
    cy.get('[data-testid="inputTodo"]').should('have.value', '') // input cleared [web:42]
  })

  it('adds a todo by pressing Enter', () => {
    cy.get('[data-testid="inputTodo"]').type('Walk dog{enter}')
    cy.get('[data-testid="ulLits"] li').should('have.length', 1) // one item [web:42]
    cy.contains('[data-testid="ulLits"] li span', 'Walk dog').should('be.visible') // text [web:42]
  })

  it('does not add blank todos (trim check)', () => {
    cy.get('[data-testid="inputTodo"]').type('   ') // spaces only
    cy.contains('button', 'Add').click()
    cy.get('[data-testid="ulLits"] li').should('have.length', 0) // still empty [web:42]
  })

  it('toggles completion via checkbox', () => {
    // add
    typeTodo('Read book')
    cy.contains('button', 'Add').click()
    // toggle
    cy.get('[data-testid="ulLits"] li input[type="checkbox"]').check({ force: true })
    cy.get('[data-testid="ulLits"] li span')
      .should('have.class', 'line-through')
      .and('have.class', 'text-gray-500') // completed styles [web:42]
    // toggle back
    cy.get('[data-testid="ulLits"] li input[type="checkbox"]').uncheck({ force: true })
    cy.get('[data-testid="ulLits"] li span')
      .should('not.have.class', 'line-through')
      .and('have.class', 'text-gray-800') // active styles [web:42]
  })

  it('deletes a todo', () => {
    typeTodo('Task A'); cy.contains('button', 'Add').click()
    typeTodo('Task B'); cy.contains('button', 'Add').click()
    cy.get('[data-testid="ulLits"] li').should('have.length', 2)
    // delete first li
    cy.get('[data-testid="ulLits"] li').first().within(() => {
      cy.contains('button', 'Delete').click()
    })
    cy.get('[data-testid="ulLits"] li').should('have.length', 1)
    cy.get('[data-testid="ulLits"] li').first().should('contain.text', 'Task B') // remaining [web:42]
  })

  it('starts edit by copying text into input (Edit button path)', () => {
    typeTodo('Original'); cy.contains('button', 'Add').click()
    cy.get('[data-testid="ulLits"] li').first().within(() => {
      cy.contains('button', 'Edit').click()
    })
    cy.get('[data-testid="inputTodo"]').should('have.value', 'Original') // setInput(text) [web:42]
  })

  it('updates a todo through addTodo path when editId is set', () => {
    // Add two
    typeTodo('First'); cy.contains('button', 'Add').click()
    typeTodo('Second'); cy.contains('button', 'Add').click()
    // Start edit second
    cy.get('[data-testid="ulLits"] li').eq(1).within(() => {
      cy.contains('button', 'Edit').click()
    })
    // Input gets prefilled; change and click Add (component reuses Add for save when editId set)
    cy.get('[data-testid="inputTodo"]').clear().type('Second (edited)')
    cy.contains('button', 'Add').click()
    // Assert updated text present and only two items
    cy.get('[data-testid="ulLits"] li').should('have.length', 2)
    cy.get('[data-testid="ulLits"] li').eq(1).should('contain.text', 'Second (edited)') // updated [web:42]
  })

  it('saveEdit path (if used) updates via editText state', () => {
    // This component defines saveEdit but not wired in UI; demonstrate unit interaction by invoking via app code path:
    // Add one, start edit, simulate editing through input bound to setInput (then click Add)
    typeTodo('Alpha'); cy.contains('button', 'Add').click()
    cy.contains('button', 'Edit').click()
    cy.get('[data-testid="inputTodo"]').clear().type('Alpha v2')
    cy.contains('button', 'Add').click()
    cy.get('[data-testid="ulLits"] li').first().should('contain.text', 'Alpha v2') // updated [web:42]
  })

  it('shows empty state message when list is cleared to zero', () => {
    typeTodo('X'); cy.contains('button', 'Add').click()
    cy.contains('[data-testid="ulLits"] li', 'X').within(() => {
      cy.contains('button', 'Delete').click()
    })
    cy.contains('No todos yet. Add one above!').should('be.visible') // empty state [web:42]
  })
})
