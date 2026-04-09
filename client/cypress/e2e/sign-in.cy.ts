import { faker } from "@faker-js/faker";

describe("Sign-in tests", () => {
  it("should connect successfully", () => {
    cy.visit("/");

    cy.contains("Login").click();
    cy.get('input[name="email"]').type("Jean.Dupont@gmail.com");
    cy.get('input[name="password"]').type("Azertyui9579.");

    cy.get(".btn").click();
  });

  it("should failed to connect cause the user not exist or the password is not good", () => {
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();

    cy.visit("/");
    cy.contains("Login").click();

    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type(randomPassword);

    cy.get(".btn").click();

    cy.contains('Invalid credentials').should('be.visible');

    cy.url().should('include', '/login');
  });
});
