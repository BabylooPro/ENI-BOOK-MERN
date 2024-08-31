const express = require("express");
const app = express();
const PORT = 3000;

// Middleware pour afficher les requêtes reçues
app.use((req, res, next) => {
	console.log(`Requête reçue : ${req.method} - ${req.url}`);
	next();
});

// Route principale
app.get("/", (req, res) => {
	res.send("Bienvenue sur notre serveur Express !");
});

// Route avec paramètre (nom de l'utilisateur)
app.get("/utilisateur/:nom", (req, res) => {
	res.send(`Bonjour, ${req.params.nom} !`);
});

// Middleware pour gérer les erreurs 404
app.use((req, res) => {
	res.status(404).send("Désolé, contenu introuvable !");
});

// Démarrage du serveur
app.listen(PORT, () => {
	console.log(`Serveur démarré sur le port ${PORT}`);
});
