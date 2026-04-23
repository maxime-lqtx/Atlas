import { faker } from "@faker-js/faker";

describe("Test for sign-up", () => {
  // test for create a new user
  it("should sign-up successfully", () => {
    const randomLastName = faker.person.lastName();
    const randomFirstName = faker.person.firstName();
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();

    cy.visit("/");

    cy.contains("Register").click();
    cy.url().should("include", "/register");

    cy.get('input[name="lastname"]').type(randomLastName);
    cy.get('input[name="firstname"]').type(randomFirstName);
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type(randomPassword);

    cy.get(".btn").click();
  });

  // case: Email already exist
  it("should failed cause email already exist", () => {
    cy.visit("/");

    cy.contains("Register").click();
    cy.url().should("include", "/register");

    cy.get('input[name="lastname"]').type("Dupont");
    cy.get('input[name="firstname"]').type("Jean");
    cy.get('input[name="email"]').type("Jean.Dupont@gmail.com");
    cy.get('input[name="password"]').type("Azertyui9579.");

    cy.get(".btn").click();

    cy.contains("This user already exist !").should("be.visible");
  });
});
