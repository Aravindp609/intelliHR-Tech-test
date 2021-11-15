/// <reference types="cypress" />

const dayjs = require("dayjs");

describe('Admin user visits People page', () => {

	// User Story #8
	it('should see Thomas Mason is shown under Direct Reports', () => {
		cy.adminUserLogin();
		cy.get('#filterControllerSearchInput').type('Lyanna');
		cy.get('[data-component-context="total-person-count"]').should('contain', '1 person');
		cy.get('[data-component-type="avatar_tile"]').click();

		// select 'Job' tab
		cy.get('[data-tabindex="1"]')
			.should('contain', 'Job')
			.should('be.visible')
			.click();
		cy.scrollTo('bottom');
		cy.contains('Reporting').should('be.visible');

		// Thomas Mason is shown under 'Direct Reports'
		cy.contains('Thomas Mason').should('be.visible');

	})

	// User Story #9
	it('should downloaded All People csv file succesfully', () => {
		cy.visit('/auth/login');
		cy.authenticate('Admin');
		cy.contains('People').click();

		// Click on 'Export People' button
		cy.contains(' Export People').click();

		// select 'All People'
		cy.contains('All People').click();
		//cy.screenshot();

		//csv file has been downloaded
		const path = require("path");
		const formattedDate = dayjs().format('Do YYYYMMMMHHmmss');
		const downloadedFile = "people-export-qa_tech_test_demo-" + formattedDate
		it('Verify the downloaded file', () => {
			const downloadsFolder = Cypress.config("downloadsFolder");
			cy.readFile(path.join(downloadsFolder, downloadedFile)).should("exist");
		});
	})


})
