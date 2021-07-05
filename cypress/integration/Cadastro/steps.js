// Implementação dos passos descritos
const { expect, should } = require("chai");
let Chance = require("chance");
let chance = new Chance();

Given(/^que acesso o site$/, () => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/api/1/databases/userdetails/collections/newtable?**",
      status: 200,
      response: {},
    }).as("postNewtable");

    cy.route({
      method: "POST",
      url: "**/api/1/databases/userdetails/collections/usertable?**",
      status: 200,
      response: {},
    }).as("postUsertable");

    cy.route({
      method: "GET",
      url: "**/api/1/databases/userdetails/collections/newtable?**",
      status: 200,
      response: {},
    }).as("getNewtable");

    cy.visit("Register.html");
});


When(/^Informar meus dados$/, () => {
	cy.get('input[placeholder="First Name"]').type(chance.first());
    cy.get("input[ng-model^=Last]").type(chance.last());
    cy.get("input[ng-model^=Email]").type(chance.email());
    cy.get("input[ng-model^=Phone]").type(chance.phone({ formatted: false }));

    //checkboxes
    cy.get("input[value=Male]").check();
    cy.get("input[type=checkbox]").check("Cricket");
    cy.get("input[type=checkbox]").check("Hockey");
    cy.get("input[type=checkbox]").check("Movies");

    // select -> select & select2 (combos)
    cy.get("select#Skills").select("Javascript");
    cy.get("select#countries").select("Brazil");

    cy.get("select#yearbox").select("1998");
    cy.get("select[ng-model^=month]").select("August");
    cy.get("select#daybox").select("10");

    cy.get("input#firstpassword").type("Lucas@1234");
    cy.get("input#secondpassword").type("Lucas@1234");

    // input file -- upload file
    cy.get("input#imagesrc").attachFile("imagem.jpeg");

});

When(/^Salvar$/, () => {
	cy.get("button#submitbtn").click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
	
    cy.wait("@postNewtable").then((resNewtable) => {
        expect(resNewtable.status).to.eq(200);
      });
  
      cy.wait("@postUsertable").then((resUsertable) => {
        expect(resUsertable.status).to.eq(200);
      });
  
      cy.wait("@getNewtable").then((resNewtable) => {
        expect(resNewtable.status).to.eq(200);
      });
      cy.url().should('contain', 'WebTable');
});
