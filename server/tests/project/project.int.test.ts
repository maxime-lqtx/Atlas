import type { NextFunction, Request } from "express";
import supertest from "supertest";
import databaseClient, { type Result, type Rows } from "../../database/client";
import app from "../../src/app";
import type { AuthRequest } from "../../src/middleware/verifyToken";

// afterEach test restore all mock
afterEach(() => {
    jest.restoreAllMocks();
});

// mock the verifyToken middleware
jest.mock("../../src/middleware/verifyToken", () => ({
    verifyToken: (req: Request, res: Response, next: NextFunction) => {
        (req as AuthRequest).user = {
            id: 1,
            email: "john@gmail.com",
            firstname: "John",
            lastname: "Doe",
            password: "hashedpassword",
            image_url: "",
            created_at: new Date(),
        };
        next();
    },
}));

// test for get all projects by user
describe("GET /projects", () => {
    it("should fetch all projects successfully", async () => {
        // mock all projects
        const mockProjects = [
            {
                id: 1,
                title: "Atlas",
                user_id: 1,
            },
            {
                id: 2,
                title: "Biome",
                user_id: 1,
            },
        ] as unknown as Rows;

        jest
            // intercept the query and put all projects in result
            .spyOn(databaseClient, "query")
            .mockResolvedValue([mockProjects, []]);

        // execute the call API
        const response = await supertest(app).get("/projects");

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(mockProjects);
    });
});

// test for create a new project
describe("POST /projects", () => {
    // case: succesfully
    it("should create a new project successfully", async () => {

        const newProject = {
            title: "Odyssey",
            description: "Description du projet odyssey",
        };

        const mockResult = { insertId: 5, affectedRows: 1 } as Result;

        jest
            .spyOn(databaseClient, "query")
            .mockResolvedValue([mockResult, []]);

        const response = await supertest(app).post("/projects").send(newProject);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("insertId", 5);
    })

    // case: failed cause field are missing
    it("should failed if field are missing", async () => {

        // title is missing 
        const newProject = {
            desciption: "this is a great description, blablalbal"
        };

        const response = await supertest(app).post("/projects").send(newProject);

        // expect error 400 
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Error: title is missing !");
    })
})