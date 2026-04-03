import supertest from "supertest";
import type { NextFunction, Request } from "express";
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
            created_at: new Date()
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
                user_id: 1
            },
            {
                id: 2,
                title: "Biome",
                user_id: 1
            }
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
})