import type { Request, Response } from "express";
import type { Result, Rows } from "../../database/client";
import userActions from "../../src/modules/user/userActions";
import userRepository from "../../src/modules/user/userRepository";
import { afterEach } from "node:test";
import "@testing-library/jest-dom";

// all the mock are restored after all test
afterEach(() => {
  jest.restoreAllMocks();
});
//on mock le repo
jest.mock("../../src/modules/user/userRepository");

// test for get /users
describe("GET /users", () => {
  // test for succes fetch all users
  it("should fetch users successfully", async () => {
    // on mock les users
    const users = [
      {
        lastname: "zerztth",
        firstname: "zefrgdtfhgj",
        email: "sfgfdf@gmail.com",
        password: "zaertrythyjhgfgfezùarety:zezr",
        image_url: "http://test.com",
        created_at: Number(new Date()), // on convertis la date en number car string de base
      },
      {
        lastname: "zerzddsfsdftth",
        firstname: "zefrgsdfsdfsddtfhgj",
        email: "sfsdfsdfgfdf@gmail.com",
        password: "zaertrythyjhgfgfezùjkhkhjkarety:zezr",
        image_url: "http://test2.com",
        created_at: Number(new Date()), // on convertis la date en number car string de base
      },
    ] as Rows;

    // j'appelle la methode readAll que je cast pour typescript et je définit le succes
    (userRepository.readAll as jest.Mock).mockResolvedValue(users);

    // req vide pour le get
    const req = {} as Request;

    // on simule le satut et le json de la reponse
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    // on simule le next()
    const next = jest.fn();

    // on execute la fonction pour lire les users
    await userActions.browse(req, res, next);

    // on attends le statut 200
    expect(res.status).toHaveBeenCalledWith(200);
    // on attends le tableau de users
    expect(res.json).toHaveBeenCalledWith(users);
  });
});

// test for get one user with his id
describe("GET /user/:id", () => {
  // test pour fetch les données d'un seul user
  it("should fetch a single user successfully", async () => {
    // on mock les données attendus
    const user = {
      id: "1",
      lastname: "zerztth",
      firstname: "zefrgdtfhgj",
      email: "sfgfdf@gmail.com",
    } as unknown as Rows;

    // j'appelle la methode read que je cast pour typescript et je définit le succes
    (userRepository.read as jest.Mock).mockResolvedValue(user);

    // on récup l'id pour 1 user
    const req = { params: { id: "1" } } as unknown as Request;

    // on simule le satut et le json de la reponse
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    // on simule le next()
    const next = jest.fn();

    await userActions.getOneById(req, res, next);

    // on attends le statut 200
    expect(res.status).toHaveBeenCalledWith(200);
    // on attends le tableau de users
    expect(res.json).toHaveBeenCalledWith(user);
  });

  // test pour un id invalid
  it("should fail on invalid id", async () => {
    // j'appelle la methode readAll que je cast pour typescript et je définit le succes
    (userRepository.read as jest.Mock).mockResolvedValue(null);

    // req invalid id
    const req = { params: { id: null } } as unknown as Request;

    // on simule le satut et le json de la reponse
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    // on simule le next()
    const next = jest.fn();

    // on execute la fonction getOneById
    await userActions.getOneById(req, res, next);

    // on attends le statut 404
    expect(res.status).toHaveBeenCalledWith(404);
    // on attends le message d'erreur
    expect(res.json).toHaveBeenCalledWith({
      message: "Utilisateur non trouvé",
    });
  });
});

// Test suite for the POST /users route
describe("POST /users", () => {
  it("should add a new users successfully", async () => {
    // Mock result of the database query

    // Fake users data
    const user = {
      lastname: "zerztth",
      firstname: "zefrgdtfhgj",
      email: "sfgfdf@gmail.com",
      password: "zaertrythyjhgfgfezùarety:zezr",
      image_url: "http://test.com",
      created_at: new Date(),
    };

    (userRepository.create as jest.Mock).mockResolvedValue(user);

    // on envoie depuis le req.body les données pour add un new user
    const req = {
      body: {
        lastname: "zerztth",
        firstname: "zefrgdtfhgj",
        email: "sfgfdf@gmail.com",
        password: "zaertrythyjhgfgfezùarety:zezr",
        image_url: "http://test.com",
        created_at: new Date(),
      },
    } as unknown as Request;

    // on simule le satut et le json de la reponse
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    // on simule le next()
    const next = jest.fn();

    // on execute la fonction pour lire les users
    await userActions.add(req, res, next);

    // on attends le statut 201
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("should fail on invalid request body", async () => {
    // Fake users data
    const user = {
      lastname: "zerztth",
      firstname: "zefrgdtfhgj",
      email: "sfgfdf@gmail.com",
      password: "zaertrythyjhgfgfezùarety:zezr",
      image_url: "http://test.com",
      created_at: new Date(),
    };

    (userRepository.create as jest.Mock).mockResolvedValue(user);

    // on envoie depuis le req.body les données pour add un new user
    const req = {
      body: {
        title: "zerztth",
        firstname: "zefrgdtfhgj",
        email: "",
        password: "zaertrythyjhgfgfezùarety:zezr",
        image_url: "http://test.com",
        created_at: new Date(),
      },
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const next = jest.fn();

    await userActions.add(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Email et mot de passe requis.",
    });
  });
});

// Test suite for the PATCH /users/:id route
// Pas fini
// describe("PATCH /user/:id", () => {
//   it("should update an existing users successfully", async () => {
//     const user = {
//       id: "1",
//       lastname: "zerztth",
//       firstname: "zefrgdtfhgj",
//       email: "sfgfdf@gmail.com",
//       password: "zaertrythyjhgfgfezùarety:zezr",
//       image_url: "http://test.com",
//       created_at: new Date(),
//     };

//     (userRepository.update as jest.Mock).mockResolvedValue({
//       id: 1,
//       lastname: "zertdh",
//     });

//     // on envoie depuis le req.body les données pour add un new user
//     const req = {
//       params: { id: "1" },
//       body: {
//         title: "zerth",
//         lastname: "zerth",
//         firstname: "zefrgdtfhgj",
//         email: "sfgf@gmail.com",
//         password: "zaertrythyjhgfgfezùarety:zezr",
//         image_url: "http://test.com",
//       },
//     } as unknown as Request;

//     // on mock le status et la response
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn().mockReturnThis(),
//     } as unknown as Response;

//     // on mock le next
//     const next = jest.fn();

//     await userActions.userToEdit(req, res, next);

//     expect(res.status).toHaveBeenCalledWith(204);
//   });
// });
