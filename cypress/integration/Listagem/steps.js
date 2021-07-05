/// <reference types="cypress" />


Given(/^Que o site não possui registro$/, () => {
	cy.server()
        cy.route({
            method: "GET",
            url: "**/api/1/databases/userdetails/collections/newtable?**",
            status: 200,
            response: [],
          }).as("getNewtable");
        
});

When(/^Acessar a Listagem$/, () => {
	cy.visit('WebTable.html')
});

Then(/^Devo visualizar a listagem vazia$/, () => {
	cy.get('div[role=row]').should('have.length', 1);
});




Given(/^Que o site possui apenas 1 registro$/, () => {
	cy.server()
        cy.route({
            method: "GET",
            url: "**/api/1/databases/userdetails/collections/newtable?**",
            status: 200,
            response:'fixture:webtable-get'
          }).as("getNewtable");
        
});

When(/^Acessar a listagem$/, () => {
	cy.visit('WebTable.html')
});

Then(/^Devo visualizar a listagem com apenas 1 registro$/, () => {
	cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone')
    cy.get('@gridCellPhone').should('contain.text', '312876543')
});