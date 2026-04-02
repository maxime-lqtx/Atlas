// import app, databaseclient, supertest
import app from '../../src/app';
import databaseClient, { type Rows } from "../../database/client";
import supertest from "supertest";

// afterEach test restore all mock
afterEach(() => {
    jest.restoreAllMocks();
})

// bloc de test pour get /users
describe('GET /users', () => {
    it('should fetch all users successfully', async () => {
        
        const fakeUsers = [
            {
                firstname: "Dupont",
                lastname: "John",
                email: "DupontJohn@gmail.com",
                password: "rertyzzgfhsdq",
                image_url: "http://www.imagetest.com"
            }, {
                firstname: "Silver",
                lastname: "John",
                email: "SilverJohn@gmail.com",
                password: "dqsdqsdqsd",
                image_url: "http://www.imagetest2.com"
            }
        ] as unknown as Rows[];

        // intercepte la query et mock le result fakeUsers
        jest.spyOn(databaseClient, 'query')
            .mockImplementation(async () => [fakeUsers, []]);

        // effectue la requête HTTP
        const response = await supertest(app).get("/users");

        // s'attends à recevoir le code 200 et les fakeUsers
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(fakeUsers);
    });
});
