/// <reference types="cypress" />

describe('Normal user visits configuration edit page', () => {

	// User Story #6
	it('should see Page Not Found after login', () => {
		cy.visit('/configuration/edit');
		cy.authenticate('Normal');
		cy.get('#404-app').should('contain', 'Page Not Found');
	})
})
