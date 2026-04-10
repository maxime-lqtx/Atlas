import { faker } from "@faker-js/faker";

// test for create a new project
describe("create a new project", () => {
  it("should create a new project successfully", () => {
    // randomize data for create project
    const randomProjectName = faker.internet.domainName();
    const randomProjectDescription = faker.lorem.text();

    cy.visit("/");

    cy.contains("Login").click();
    cy.url().should("include", "/login");

    cy.get('input[name="email"]').type("Jean.Dupont@gmail.com");
    cy.get('input[name="password"]').type("Azertyui9579.");

    cy.get(".btn").click();

    cy.contains("+ Nouveau Projet").click();

    cy.get("input").type(randomProjectName);
    cy.get("textarea").type(randomProjectDescription);

    cy.get(".submit").click();
  });

  it("should failed cause title is missing", () => {
    const randomProjectDescription = faker.lorem.text();

    cy.visit("/");

    cy.contains("Login").click();
    cy.url().should("include", "/login");

    cy.get('input[name="email"]').type("Jean.Dupont@gmail.com");
    cy.get('input[name="password"]').type("Azertyui9579.");

    cy.get(".btn").click();

    cy.contains("+ Nouveau Projet").click();
    cy.url().should("include", "/Dashboard");

    cy.get("textarea").type(randomProjectDescription);

    cy.get(".submit").click();

    cy.contains("Le titre du projet est obligatoire").should("be.visible");
  });
});
