const express = require("express");
const morgan = require("morgan");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

// Intégration des middlewares tiers
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Middleware pour la journalisation des requêtes HTTP personnalisé
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
});

// Middleware pour la journalisation des requêtes HTTP avec Morgan (format "tiny")
app.get("/", (req, res) => {
	res.send("Page d'accueil");
});

// Route POST "/exemple"
app.post("/exemple", (req, res) => {
	res.send(req.body);
});

// Middleware spécifique à la route GET "/exemple"
app.get(
	"/exemple",
	(req, res, next) => {
		console.log("Middleware spécifique à la route /exemple");
		next();
	},
	(req, res) => {
		res.send("Réponse de la route /exemple");
	}
);

// Route qui simule une erreur
app.get("/erreur", (req, res, next) => {
	const err = new Error("Erreur simulée");
	err.statusCode = 500; // Code d'erreur HTTP 500 (Erreur Serveur)
	next(err); // Passez l'erreur à la fonction next pour la gestion des erreurs
});

// Middleware pour la Gestion des Erreurs
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Quelque chose s'est mal passé !");
});

// Démarrage du serveur
app.listen(3000, () => {
	console.log("Serveur démarré sur le port 3000");
});
