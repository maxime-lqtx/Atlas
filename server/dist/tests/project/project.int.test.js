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
// mock the verifyToken middleware
jest.mock("../../src/middleware/verifyToken", () => ({
    verifyToken: (req, res, next) => {
        req.user = {
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
        ];
        jest
            // intercept the query and put all projects in result
            .spyOn(client_1.default, "query")
            .mockResolvedValue([mockProjects, []]);
        // execute the call API
        const response = await (0, supertest_1.default)(app_1.default).get("/projects");
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
        const mockResult = { insertId: 5, affectedRows: 1 };
        jest.spyOn(client_1.default, "query").mockResolvedValue([mockResult, []]);
        const response = await (0, supertest_1.default)(app_1.default).post("/projects").send(newProject);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("insertId", 5);
    });
    // case: failed cause field are missing
    it("should failed if field are missing", async () => {
        // title is missing
        const newProject = {
            desciption: "this is a great description, blablalbal",
        };
        const response = await (0, supertest_1.default)(app_1.default).post("/projects").send(newProject);
        // expect error 400
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Error: title is missing !");
    });
});
//
// test for get on project by user
// describe("GET /project/:id", () => {
//     it("should fetch all projects successfully", async () => {
//         // mock the project
//         const mockProjects = [
//             {
//                 id: 5,
//                 title: "Kaboom",
//                 description: "zqesgrdgfhhbfds",
//                 user_id: 1,
//             },
//         ] as unknown as Rows;
//         jest
//             // intercept the query and put the project in result
//             .spyOn(databaseClient, "query")
//             .mockResolvedValue([mockProjects, []]);
//         // execute the call API for the project with id= 5
//         const response = await supertest(app).get("/project/5");
//         expect(response.status).toBe(200);
//         expect(response.body).toStrictEqual(mockProjects);
//     });
//     // case: Failed the project doesn't exist
//     it('should failed if project does not exist', async () => {
//         // mock the db who found nothing
//         jest
//             .spyOn(databaseClient, "query")
//             .mockResolvedValue([[], []]);
//         const response = await supertest(app).get("/project/845");
//         expect(response.status).toBe(404);
//         expect(response.body.message).toBe("Project not found !");
//     })
// });
