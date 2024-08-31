import request from "supertest";
import { expect } from "chai";
import app from "../app.js";

describe("Users API", () => {
	// Test pour la création d'un nouvel utilisateur
	it("should create a new user", async () => {
		const user = { name: "John Doe", email: "john@example.com" };

		const res = await request(app).post("/users").send(user).expect(201);

		expect(res.body).to.have.property("name", "John Doe");
		expect(res.body).to.have.property("email", "john@example.com");
	});

	// Test pour récupérer tous les utilisateurs
	it("should retrieve all users", async () => {
		const res = await request(app).get("/users").expect(200);

		expect(res.body).to.be.an("array");
		expect(res.body.length).to.be.greaterThan(0);
	});

	// Test pour récupérer un utilisateur par ID
	it("should retrieve a user by ID", async () => {
		// Créez d'abord un utilisateur
		const user = { name: "John Doe", email: "john@example.com" };
		await request(app).post("/users").send(user).expect(201);

		// Récupérez l'utilisateur par son ID
		const res = await request(app).get(`/users/1`).expect(200); // ID = 1 après création

		expect(res.body).to.have.property("id", 1);
	});

	// Test pour la gestion des erreurs si l'utilisateur n'est pas trouvé
	it("should return 404 if user not found", async () => {
		const userId = 999; // ID qui n'existe pas
		const res = await request(app).get(`/users/${userId}`).expect(404);

		expect(res.text).to.equal("User not found");
	});
});
