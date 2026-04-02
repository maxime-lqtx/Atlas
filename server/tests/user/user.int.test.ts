import supertest from "supertest";
import databaseClient, { type Rows } from "../../database/client";
// import app, databaseclient, supertest
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


describe('GET /user/:id', () => {
    it('should be fetch one user', async () => {
        const fakeUser = {
            id: 2,
            firstname: "John",
            lastname: "Doe",
            email: "john@gmail.com",
            password: "rertyzzgfhsdq",
            image_url: "http://www.imagetest.com"
        } as unknown as Rows

        jest
        .spyOn(databaseClient, 'query')
        .mockImplementation(async ()=>[[fakeUser], []]);

        const response= await supertest(app).get("/user/2");

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(fakeUser);
        
    });

    it('should be return 404 if user does not exist', async ()=>{
        jest
        .spyOn(databaseClient, "query")
        .mockImplementation(async ()=>[[], []]);

        const response= await supertest(app).get("/user/22345");

        expect(response.status).toBe(404);
    } )
})