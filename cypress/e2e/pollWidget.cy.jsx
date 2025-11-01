import React from 'react'
//import PollWidget from '../../src/PollWidget/index'

describe('PollWidget (React + Vite, Cypress CT)', () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/")
    })
  it('renders 3 options, sliders disabled, no votes initially', () => {
    //cy.mount(<PollWidget />)

    cy.contains('h1', 'PollWidget').should('be.visible')
    cy.contains('label', 'Roadside 1').should('exist')
    cy.contains('label', 'Roadside 2').should('exist')
    cy.contains('label', 'Roadside 3').should('exist')

    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .and($r => {
        expect($r.get().every(el => !el.checked)).to.eq(true)
      })

    cy.get('input[role="slider"], input[type="range"]').should('have.length', 3).and('be.disabled')

    cy.contains(/votes/).should('not.exist')
  })

  it('clicking a label checks radio, increments vote, shows votes and enables sliders', () => {
    //cy.mount(<PollWidget />)

    cy.contains('label', 'Roadside 2').click()

    cy.contains('label', 'Roadside 2').find('input[type="radio"]').should('be.checked')
    cy.contains('label', 'Roadside 1').find('input[type="radio"]').should('not.be.checked')
    cy.contains('label', 'Roadside 3').find('input[type="radio"]').should('not.be.checked')

    // Initial totals: 20 + 10 + 30 = 60; after click Roadside 2 -> 11; total 61 => 11/61 = 18.0%
    cy.contains(/11 votes \(18\.0\)/).should('be.visible')

    cy.get('input[type="range"]').should('not.be.disabled')

    cy.contains('label', 'Roadside 2').parents('.item').within(() => {
      cy.get('input[type="range"]').should('have.value', '11').and('have.attr', 'max', '61')
    })
  })

  it('switching selection updates counts and percentages', () => {
    //cy.mount(<PollWidget />)

    // Click Roadside 1 -> 21; total 61; 21/61 = 34.4%
    cy.contains('label', 'Roadside 1').click()
    cy.contains(/21 votes \(34\.4\)/).should('be.visible')

    // Click Roadside 3 -> 31; total 62; 31/62 = 50.0%
    cy.contains('label', 'Roadside 3').click()
    cy.contains(/31 votes \(50\.0\)/).should('be.visible')

    cy.contains('label', 'Roadside 3').find('input[type="radio"]').should('be.checked')
    cy.contains('label', 'Roadside 1').find('input[type="radio"]').should('not.be.checked')
    cy.contains('label', 'Roadside 2').find('input[type="radio"]').should('not.be.checked')
  })

  it('reset restores initial state', () => {
   // cy.mount(<PollWidget />)

    cy.contains('label', 'Roadside 1').click()
    cy.contains(/votes/).should('be.visible')

    cy.contains('button', 'Remove Poll').click()

    cy.get('input[type="radio"]').each($r => {
      expect($r[0].checked).to.eq(false)
    })

    cy.get('input[type="range"]').should('be.disabled')

    cy.contains(/votes/).should('not.exist')
  })

  it('accessible query for range via ARIA label', () => {
    //cy.mount(<PollWidget />)

    cy.findAllByRole('slider', { name: 'rangeInput' }).should('have.length', 3).and('be.disabled')

    cy.contains('label', 'Roadside 1').click()

    cy.findAllByRole('slider', { name: 'rangeInput' }).should('have.length', 3).and('not.be.disabled')
    cy.contains('label', 'Roadside 1').parents('.item').within(() => {
      cy.findByRole('slider', { name: 'rangeInput' }).should('have.value', '21')
    })
  })
})
