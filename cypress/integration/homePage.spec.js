/// <reference types="cypress" />

describe('Anonymous user visits home page', () => {

	// User Story #1
	it('user should see the home and logo', () => {
		cy.visit('https://intellihr.com/')
		cy.url().should('eq', 'https://intellihr.com/')
		cy.get('#header-logo').should('be.visible')
	})

	// User Story #2
	it('user navigates to login page', () => {
		cy.visit('/spa/settings')
		cy.url().should('contain', 'auth/login')
		cy.get('#username').parents('form').find('input').should('be.visible')
		cy.get('#password').parents('form').find('input').should('be.visible')
	})
})

