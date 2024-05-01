const express = require("express");
const Joi = require("joi");
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware pour parser les corps des requêtes en JSON

// Middleware pour afficher les requêtes reçues
app.use((req, res, next) => {
	console.log(`Requête reçue : ${req.method} - ${req.url}`);
	next();
});

// Middleware de journalisation personnalisé
app.use((req, res, next) => {
	const originalSend = res.send;
	res.send = function (data) {
		console.log(
			`Requête traitée : ${req.method} - ${req.originalUrl} - ${res.statusCode}`
		);
		originalSend.apply(res, arguments);
	};
	next();
});

// Route principale
app.get("/", (req, res) => {
	res.send("Bienvenue sur notre serveur Express !");
});

// Route API : /api
app.get("/api", (req, res) => {
	res.json({ message: "Bienvenue sur notre API" });
});

// Route avec paramètre (nom de l'utilisateur) : /utilisateur/:nom
app.get("/utilisateur/:nom", (req, res) => {
	res.send(`Bonjour, ${req.params.nom} !`);
});

// Route pour traiter les requêtes POST à `/submit` via Joi
const schema = Joi.object({
	nom: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
});

// Route pour valider les données soumises
app.post("/submit", (req, res) => {
	const { error, value } = schema.validate(req.body);
	if (error) {
		return res
			.status(400)
			.json({ message: "Validation error", error: error.details });
	}
	res.status(200).json({
		message: "Validation réussie",
		data: value,
	});
});

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
	const err = new Error("Non Trouvé");
	err.status = 404;
	next(err);
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
	console.error(err.stack);
	const statusCode = err.status || 500;
	res.status(statusCode).json({
		message: err.message,
		error: app.get("env") === "development" ? err : {},
	});
});

// Démarrage du serveur
app.listen(PORT, () => {
	console.log(`Serveur démarré sur le port ${PORT}`);
});
