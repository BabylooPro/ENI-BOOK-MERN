import express from "express";
const app = express();
app.use(express.json());

const users = [];

// Endpoint POST pour créer un nouvel utilisateur
app.post("/users", (req, res) => {
	const user = {
		id: users.length + 1, // ID incrémenté automatiquement
		...req.body, // Prend toutes les propriétés de req.body
	};
	users.push(user);
	res.status(201).send(user);
});

// Endpoint GET pour récupérer tous les utilisateurs
app.get("/users", (req, res) => {
	res.send(users);
});

// Endpoint GET pour récupérer un utilisateur par ID
app.get("/users/:id", (req, res) => {
	const user = users.find((u) => u.id === parseInt(req.params.id));
	if (user) {
		res.json(user);
	} else {
		res.status(404).send("User not found"); // Retourne une réponse texte pur
	}
});

// Configurer le port et démarrer le serveur
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

// Exporter l'application Express
export default app;
