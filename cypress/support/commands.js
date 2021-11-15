Cypress.Commands.add("authenticate", (userType) => {
	if (userType === 'Normal') {
		cy.get('#username').type('ally.m');
		cy.get('#password').type('Tail-Borrow-Chief-Control-7', { log: false });
		cy.contains('Sign In').click();
	}
	if (userType === 'Manager') {
		cy.get('#username').type('adam.b');
		cy.get('#password').type('Take-Likely-Camera-Seem-2', { log: false });
		cy.contains('Sign In').click();
	}
	if (userType === 'Admin') {
		cy.get('#username').type('clark.k');
		cy.get('#password').type('Frame-Cautious-Salt-Offense-6', { log: false });
		cy.contains('Sign In').click();
	}
});

Cypress.Commands.add("adminUserLogin", () => {
	cy.visit('/auth/login');
	cy.authenticate('Admin');
	cy.contains('People').click();
})
