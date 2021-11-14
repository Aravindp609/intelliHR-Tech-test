/// <reference types="cypress" />

describe('Manager user visits Job page', () => {

	// User Story #7
	it('should see should see Remuneration Schedule section', () => {
		cy.visit('/auth/login');
		cy.authenticate('Manager');
		cy.contains('My Profile').click();
		cy.get('[data-tabindex="1"]')
			.should('contain', 'Jobs')
			.should('be.visible')
			.click();
		cy.contains('Remuneration Schedule').should('be.visible');
		cy.contains('Show Content').click();

		cy.get('[data-component-type="currency_text"]').should('contain', '150.00').should('be.visible')

	})
})

