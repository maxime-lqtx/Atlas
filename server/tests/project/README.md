Documentation des tests d'integration pour project
Environnement technique
Framework utilisé : JEST

Client utilisé : Supertest

Gestion des projets
Authentification (Le middleware verifyToken)
verifyToken Mock : Pour l'ensemble de ces tests, le middleware d'authentification est simulé (mocké). Il injecte un utilisateur fictif dans la requête pour permettre l'accès aux routes protégées sans nécessiter de jeton JWT réel.

GET /projects
Success 200 : Vérifie que l'API retourne la liste complète des projets associés à l'utilisateur qui est connecté.

Failed: Pas fait car si pas de projet peut renvoyer un tableau vide, donc pas une erreur.

POST /projects (create)
Success 201 : Vérifie la création d'un nouveau projet lorsque les données sont valides.

Failed 400 : Vérifie le rejet de la requête si un champ obligatoire est manquant dans le corps de la requête.

A faire :

- PUT or PATCH
- GET project/:id
- DELETE
