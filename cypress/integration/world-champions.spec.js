/// <reference types="Cypress" />

describe("f1 drivers world champions list", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/ergast.com/api/f1/*").as("driverStandings");
    cy.visit("http://localhost:3000/");
  });

  // it("should get list of drivers champions", () => {
  //   cy.intercept("GET", "https://jsonplaceholder.cypress.io/comments/1")
  //     .its("response.statusCode")
  //     .should("eq", 200);
  //   cy.visit("http://localhost:3000/");
  //   // cy.wait(4000);
  //   // cy.get("@driverStandings").its("response.statusCode").should("eq", 200);
  // });

  it("should display cards with world champions content ", () => {
    cy.get('*[class^="card-container"]').should("have.length.above", 1);
    cy.get('*[class^="card-text-header"]').should((text) => {
      expect(text.text().length).to.be.above(1);
    });
    cy.get('*[class^="card-text-value"]').should((text) => {
      expect(text.text().length).to.be.above(1);
    });
    cy.get('*[class^="flags"]')
      .find("img")
      .should("have.attr", "src")
      .should("include", "https://countryflagsapi.com/");
  });

  it("should be able to click on the displayed cards and navigate to winners", () => {
    cy.get('*[class^="card-text-value"]').first().should("be.visible").click();
    cy.url().should("include", "/winners:");
  });
});
