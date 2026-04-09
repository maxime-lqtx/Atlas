import { faker } from "@faker-js/faker";

describe("Create new task", () => {
  it("should create a new task successfully", () => {
    const randomTaskName = faker.internet.domainName();
    const randomTaskDescription = faker.lorem.text();

    cy.visit("/");

    cy.contains("Login").click();
    cy.url().should("include", "/login");

    cy.get('input[name="email"]').type("Jean.Dupont@gmail.com");
    cy.get('input[name="password"]').type("Azertyui9579.");

    cy.get(".btn").click();

    cy.url().should("include", "Dashboard");

    cy.get(".open").first().click();

    cy.contains("+ Nouvelle Tâche").click();
    cy.get("form").should("be.visible");

    cy.get(".input-bordered").type(randomTaskName);
    cy.get("select").first().select(0);
    cy.get(".textarea").type(randomTaskDescription);

    cy.get(".submit").click();
    cy.reload();
  });
});
