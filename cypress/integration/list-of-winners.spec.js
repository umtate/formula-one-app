/// <reference types="Cypress" />
describe("list of f1 driver winners for a season", () => {
  let year = "";
  let champDriver = "";
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get("[id^=world-champ-]")
      .first()
      .then((text) => {
        champDriver = text.text();
      })
      .then(() => {
        cy.get('*[class^="card-text-header"]')
          .first()
          .then((text) => {
            year = text.text();
          })
          .click();
      });
  });

  it("should have url with the year as an argument", () => {
    cy.url().should("include", `:${year}`);
  });
  it("should display heading with year selected ", () => {
    // We'll store our item text in a variable so we can reuse it
    cy.get("#heading").should((text) => {
      expect(text.text().toLowerCase()).to.equal(`${year} driver standings`);
    });
  });

  it("should be able to navigate back to champions page after clicking champions", () => {
    cy.get("#champions-link").should("be.visible").click();
    cy.url().should("not.include", "/winners");
  });

  it("should display table of winners with at least one race", () => {
    cy.get("table").contains("th", "Winner");
    cy.get("table").get("tr").should("have.length.above", 1);
  });

  it("should highlight world champion in the table of winners ", () => {
    cy.get("[id^=highlight-]")
      .should("have.attr", "src")
      .should("include", "trophy-icon");
  });
});
