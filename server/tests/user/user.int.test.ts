import supertest from "supertest";
import databaseClient, { type Result, type Rows } from "../../database/client";
import app from "../../src/app";

// afterEach test restore all mock
afterEach(() => {
  jest.restoreAllMocks();
});

// bloc de test pour get /users
describe("GET /users", () => {
  it("should fetch all users successfully", async () => {
    const fakeUsers = [
      {
        firstname: "Dupont",
        lastname: "John",
        email: "DupontJohn@gmail.com",
        password: "rertyzzgfhsdq",
        image_url: "http://www.imagetest.com",
      },
      {
        firstname: "Silver",
        lastname: "John",
        email: "SilverJohn@gmail.com",
        password: "dqsdqsdqsd",
        image_url: "http://www.imagetest2.com",
      },
    ] as unknown as Rows[];

    // intercepte la query et mock le result fakeUsers
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [fakeUsers, []]);

    // effectue la requête HTTP
    const response = await supertest(app).get("/users");

    // s'attends à recevoir le code 200 et les fakeUsers
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(fakeUsers);
  });
});

// test for one user
describe("GET /user/:id", () => {
  // case successfully
  it("should be fetch one user", async () => {
    const fakeUser = {
      id: 2,
      firstname: "John",
      lastname: "Doe",
      email: "john@gmail.com",
      password: "rertyzzgfhsdq",
      image_url: "http://www.imagetest.com",
    } as unknown as Rows;

    // intercept the req and add fakeUser in response
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [[fakeUser], []]);

    // execute call API
    const response = await supertest(app).get("/user/2");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(fakeUser);
  });

  // case user doesn't exist
  it("should be return 404 if user does not exist", async () => {
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [[], []]);

    const response = await supertest(app).get("/user/22345");

    expect(response.status).toBe(404);
  });
});

// test for add a new user
describe("POST /users", () => {
  // case successfully
  it("should create a new user successfully", async () => {
    const newUser = {
      firstname: "Thomas",
      lastname: "Shelby",
      email: "Thomas@gmail.com",
      password: "sdqsdhmhufgwv",
      image_url: "http://www.imagetest54.com",
    } as unknown as Rows;

    // mock the insertId result
    const result = { insertId: 1 } as Result;

    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // execute the call API get
    const response = await supertest(app).post("/users").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ insertId: 1 });
  });

  // case fields is missing
  it("should failed if required field is missing", async () => {
    const newUser = {
      lastname: "Duncan",
      password: "sdqsdfdgdfhmnvbnhufdfgdfgwv",
      image_url: "http://www.imagetest5fdg4.com",
    } as unknown as Rows;

    const response = await supertest(app).post("/users").send(newUser);

    expect(response.status).toBe(400);
  });

  // case : if email already exist
  it("should failed if email already exist", async () => {
    const newUser = {
      firstname: "Thomas",
      lastname: "Shelby",
      email: "Thomas@gmail.com",
      password: "sdqsdhmhufgwv",
      image_url: "http://www.imagetest54.com",
    } as unknown as Rows;

    const UserExisting = {
      id: 1,
      email: "Thomas@gmail.com",
    } as unknown as Rows;

    jest.spyOn(databaseClient, "query").mockResolvedValue([[UserExisting], []]);

    const response = await supertest(app).post("/users").send(newUser);

    // return code 409 for conflict to duplicate a user
    expect(response.status).toBe(409);
    expect(response.body).toStrictEqual({
      message: "This user already exist !",
    });
  });
});

// test on delete user
describe("DELETE /user/:id", () => {
  it("should delete user successfully", async () => {
    // mock the success affected row
    const mockResult = { affectedRows: 1 } as Result;

    jest.spyOn(databaseClient, "query").mockResolvedValue([[mockResult], []]);

    const response = await supertest(app).delete("/user/2");

    // doesn't return the content but just the status
    expect(response.status).toBe(204);
  });

  // case : if user doesn't exist in db
  it("should failed if user does not exist", async () => {
    // mock the affected row at 0 cause failed
    const mockResult = { affectedRows: 0 } as Result;

    jest.spyOn(databaseClient, "query").mockResolvedValue([mockResult, []]);

    const response = await supertest(app).delete("/user/54654");

    // return the status not found + the message
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({ message: "User not found !" });
  });
});
