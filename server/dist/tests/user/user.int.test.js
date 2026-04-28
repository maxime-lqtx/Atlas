"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const client_1 = __importDefault(require("../../database/client"));
const app_1 = __importDefault(require("../../src/app"));
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
        ];
        // intercepte la query et mock le result fakeUsers
        jest
            .spyOn(client_1.default, "query")
            .mockImplementation(async () => [fakeUsers, []]);
        // effectue la requête HTTP
        const response = await (0, supertest_1.default)(app_1.default).get("/users");
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
        };
        // intercept the req and add fakeUser in response
        jest
            .spyOn(client_1.default, "query")
            .mockImplementation(async () => [[fakeUser], []]);
        // execute call API
        const response = await (0, supertest_1.default)(app_1.default).get("/user/2");
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(fakeUser);
    });
    // case user doesn't exist
    it("should be return 404 if user does not exist", async () => {
        jest
            .spyOn(client_1.default, "query")
            .mockImplementation(async () => [[], []]);
        const response = await (0, supertest_1.default)(app_1.default).get("/user/22345");
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
        };
        // mock the insertId result
        const result = { insertId: 1 };
        jest
            .spyOn(client_1.default, "query")
            .mockImplementation(async () => [result, []]);
        // execute the call API get
        const response = await (0, supertest_1.default)(app_1.default).post("/users").send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ insertId: 1 });
    });
    // case fields is missing
    it("should failed if required field is missing", async () => {
        const newUser = {
            lastname: "Duncan",
            password: "sdqsdfdgdfhmnvbnhufdfgdfgwv",
            image_url: "http://www.imagetest5fdg4.com",
        };
        const response = await (0, supertest_1.default)(app_1.default).post("/users").send(newUser);
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
        };
        const UserExisting = {
            id: 1,
            email: "Thomas@gmail.com",
        };
        jest.spyOn(client_1.default, "query").mockResolvedValue([[UserExisting], []]);
        const response = await (0, supertest_1.default)(app_1.default).post("/users").send(newUser);
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
        const mockResult = { affectedRows: 1 };
        jest.spyOn(client_1.default, "query").mockResolvedValue([[mockResult], []]);
        const response = await (0, supertest_1.default)(app_1.default).delete("/user/2");
        // doesn't return the content but just the status
        expect(response.status).toBe(204);
    });
    // case : if user doesn't exist in db
    it("should failed if user does not exist", async () => {
        // mock the affected row at 0 cause failed
        const mockResult = { affectedRows: 0 };
        jest.spyOn(client_1.default, "query").mockResolvedValue([mockResult, []]);
        const response = await (0, supertest_1.default)(app_1.default).delete("/user/54654");
        // return the status not found + the message
        expect(response.status).toBe(404);
        expect(response.body).toStrictEqual({ message: "User not found !" });
    });
});
