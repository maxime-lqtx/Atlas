Documentation des tests d'integration pour user
Environnement technique
Framework utilisé : JEST

Client utilisé : Supertest

Gestion des utilisateurs
GET /users
Success 200 : Vérifie que l'API retourne la liste complète des utilisateurs présents en base de données.

Failed : Pas fait car si pas de user peut renvoyer un tableau vide, donc pas une erreur.

GET /user/:id
Success 200 : Vérifie la récupération d'un utilisateur spécifique via son identifiant unique.

Failed 404 : Vérifie la réponse de l'API si l'id demandé n'existe pas en base de données.

POST /users (create)
Success 201 : Vérifie la création d'un nouvel utilisateur avec des données valides.

Failed 400 : Vérifie le rejet de la requête si des champs obligatoires sont manquants dans le corps de la requête.

Failed 409 : Vérifie si l'email est déjà utilisé en base de données.

DELETE /user/:id
Success 204 : Vérifie que la suppression s'effectue correctement.

Failed 404 : Vérifie l'échec de la suppression si l'utilisateur n'existe pas.