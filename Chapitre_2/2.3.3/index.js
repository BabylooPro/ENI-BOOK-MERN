const express = require("express"); // Importation du module Express dans l'application
const app = express(); // Création d'une nouvelle application Express
const port = 3000; // Définition du port sur lequel le serveur va écouter

// Définition de la route racine de l'application
app.get("/", (req, res) => {
	res.send("Bienvenue sur mon serveur Express.js !"); // Envoi d'une réponse au client
});

// Démarrage du serveur
app.listen(port, () => {
	console.log(`Serveur démarré sur http://localhost:${port}`); // Confirmation que le serveur fonctionne
});
