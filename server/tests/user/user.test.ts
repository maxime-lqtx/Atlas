// Import the supertest library for making HTTP requests
import supertest from "supertest";

// Import the Express application
import app from "../../src/app";

// Import databaseClient
import databaseClient from "../../database/client";

import type { Result, Rows } from "../../database/client";
import type { IUser } from "../../src/modules/user/user";
import userRepository from "../../src/modules/user/userRepository";

// Restore all mocked functions after each test
afterEach(() => {
  jest.restoreAllMocks();
});

// Test suite for the GET /users route
describe("GET /users", () => {
  it("should fetch users successfully", async () => {
    // Mock empty rows returned from the database
    const rows = [] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Send a GET request to the /users endpoint
    const response = await supertest(app).get("/users");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

// Test suite for the GET /users/:id route
describe("GET /user/:id", () => {
  it("should fetch a single users successfully", async () => {
    // Mock rows returned from the database
    const rows = [{}] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Send a GET request to the /users/:id endpoint
    const response = await supertest(app).get("/user/1");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should fail on invalid id", async () => {
    // Mock empty rows returned from the database
    const rows = [] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Send a GET request to the /users/:id endpoint with an invalid ID
    const response = await supertest(app).get("/user/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Utilisateur non trouvé" });
  });
});

// Test suite for the POST /users route
// Doesn't pass: maybe something to change in app config :/
describe("POST /users", () => {
  it("should add a new users successfully", async () => {
    // Mock result of the database query
    const result = { insertId: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake users data
    const fakeItem = {
      lastname: "zerztth",
      firstname: "zefrgdtfhgj",
      email: "sfgfdf@gmail.com",
      password: "zaertrythyjhgfgfezùarety:zezr",
      image_url: "http://test.com",
      created_at: new Date(),
    };

    // Send a POST request to the /users endpoint with a test users
    const response = await supertest(app).post("/users").send(fakeItem);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });

  it("should fail on invalid request body", async () => {
    // Mock result of the database query
    const result = { insertId: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake users data with missing users_id
    const fakeItem = { title: "foo" };

    // Send a POST request to the /users endpoint with a test users
    const response = await supertest(app).post("/users").send(fakeItem);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Email et mot de passe requis." });
  });
});

// Test suite for the PUT /users/:id route
// This route is not yet implemented :/
describe("PATCH /user/:id", () => {
  it("should update an existing users successfully", async () => {
    jest.spyOn(userRepository, "read").mockResolvedValue({
      id: 1,
      lastname: "Doe",
      firstname: "John",
      email: "john@example.com",
      password: "hashedPassword",
      image_url: "http://example.com/image.jpg",
      created_at: new Date(),
    });

    // Mock result of the database query
    const result = { affectedRows: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake users data
    const fakeItem = {
      lastname: "zerth",
      firstname: "zedtfhgj",
      email: "sfgf@gmail.com",
      password: "zaertrythyjhgfgfezùarety:zezr",
      image_url: "http://test.com",
      created_at: new Date(),
    };

    // Send a PUT request to the /users/:id endpoint with a test users
    const response = await supertest(app).patch("/user/1").send(fakeItem);

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid request body", async () => {
    // Mock that the user exists
    jest.spyOn(userRepository, "read").mockResolvedValue({
      id: 1,
      lastname: "Doe",
      firstname: "John",
      email: "john@example.com",
      password: "hashedPassword",
      image_url: "http://example.com/image.jpg",
      created_at: new Date(),
    });

    // Send an incomplete body (ex: no lastname)
    const fakeItem = { firstname: "John" };

    // Call PATCH
    const response = await supertest(app).patch("/user/1").send(fakeItem);

    // Expect 400 because validation checks for required fields
    expect(response.status).toBe(400);
  });

  it("should fail on invalid id", async () => {
    // 1. On simule que la lecture en base de données renvoie null (l'user n'existe pas)
    jest
      .spyOn(userRepository, "read")
      .mockResolvedValue(null as unknown as IUser);

    // 2. IMPORTANT : Envoie un body VALIDE pour ne pas déclencher le 400 de validation
    const fakeItem = {
      lastname: "Doe",
      firstname: "John",
      email: "john@example.com",
      // ... autres champs requis par ton contrôleur
    };

    // 3. Envoi de la requête PATCH
    const response = await supertest(app).patch("/user/9999").send(fakeItem);

    // 4. Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Error: user doesn't exist" });
  });
});

// Test suite for the DELETE /users/:id route
// This route is not yet implemented :/
describe("DELETE /user/:id", () => {
  it("should delete an existing user successfully", async () => {
    // Mock result of the database query
    const result = { affectedRows: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Send a DELETE request to the /users/:id endpoint
    const response = await supertest(app).delete("/user/42");

    // Assertions
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid id", async () => {
    // Mock result of the database query
    const result = { affectedRows: 0 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Send a DELETE request to the /user/:id endpoint
    const response = await supertest(app).delete("/user/43");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "User not found !" });
  });
});
