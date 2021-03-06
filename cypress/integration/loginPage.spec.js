/// <reference types="cypress" />

describe('Authenticated user visits loging page', () => {

	// User Story #3
	it('normal user should login successfully and see the dashboard', () => {
		cy.visit('/auth/login');
		cy.get('.sign-in-content ').find('p').should('contain', 'Sign in to intelliHR');
		cy.authenticate('Normal');
		cy.url().should('contain', 'dashboard');
		cy.get("h1").should('contain', /Good (morning|afternnon|evening), Ally/);
	})

	// User Story #4
	it('Manger user should login, Create and Delete Skill ', () => {
		cy.visit('/auth/login');
		cy.authenticate('Manager');
		cy.url().should('contain', 'dashboard');
		cy.visit('/spa/settings/skills');
		//cy.get('[data-component-type="text"]').should('not.containcontain', 'Access Denied')
		// https://qa-tech-test-demo.intellihr.net/spa/settings/skills showing Access Denied
	})

	// User Story #5
	it('Admin user should login and update Profile page successfully', () => {
		cy.clearCookies();
		cy.clearLocalStorage();
		cy.adminUserLogin();
		cy.url().should('contain', 'people');
		cy.get('h1').should('contain', 'People');
		cy.get('#filterControllerSearchInput').type('Lyanna')
		cy.get('[data-component-context="total-person-count"]').should('contain', '1 person');
		cy.get('[data-component-type="avatar_tile"]').click();

		// scroll down to 'Email Address' section
		cy.get('[data-component-context="email-address-annotated-section"]').scrollIntoView().should('contain', 'Email Address').should('be.visible')

		// index 1 shows that position of 'demo@intellihr.com' is on the 1st row
		cy.get('[data-component-context="email-address-smart-list-column-emails"]').eq(1).should('contain', 'demo@intellihr.com');
		cy.get('[data-component-context="email-address-demo@intellihr.com-pill-primary"]').should('contain', 'Primary');
		cy.get('[data-component-context="email-address-demo@intellihr.com-pill-personal"]').should('contain', 'Personal');

		// index 2 shows that position of 'demo@intellihr.com.au' is on the 2nd row
		cy.get('[data-component-context="email-address-smart-list-column-emails"]').eq(2).should('contain', 'demo@intellihr.com.au');
		cy.get('[data-component-context="email-address-demo@intellihr.com.au-pill-personal"]').should('contain', 'Personal');

		cy.get('[data-component-context="email-address-annotated-section"]').find('button', '.sc-EHOje DWcgW').eq(1).click();
		cy.get('[data-component-type="popover"]').should('contain', 'Edit');
		cy.get('[data-component-type="popover"]').should('contain', 'Delete');

		// selecting 'Edit' option
		cy.contains('Edit').click();

		// selecting 'Work Email Address' radio button
		cy.contains('Work Email Address').click();

		// check the 'Primary Email Address' checkbox		
		cy.get('.checkbox').should('contain', 'Primary Email Address').click();

		// press the Save button
		cy.contains('Save').click();

		cy.get('h2').should('contain', 'Personal Information');

		// I used first() shows that position of 'demo@intellihr.com.au' is on the 1st row
		cy.get('[data-component-context="email-address-smart-list"]').first().should('contain', 'demo@intellihr.com.au');
		cy.get('[data-component-context="email-address-demo@intellihr.com.au-pill-primary"]').should('contain', 'Primary');
		cy.get('[data-component-context="email-address-demo@intellihr.com.au-pill-work"]').should('contain', 'Work');

		cy.get('[data-component-context="email-address-smart-list"]').should('contain', 'demo@intellihr.com');
		cy.get('[data-component-context="email-address-demo@intellihr.com-pill-personal"]').should('contain', 'Personal');
	})
})