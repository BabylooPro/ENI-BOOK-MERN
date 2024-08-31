require("dotenv").config();
const express = require("express");

// Importer les fichiers nécessaires
const db = require("./src/db");
const routes = require("./src/routes");
const seedDatabase = require("./src/seed");

const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Utilisation des routes définies dans le fichier routes.js
app.use("/api", routes);

// Gestion des erreurs globales
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send({ message: "Une erreur est survenue !" });
});

// Initialisation de la connexion à MongoDB
db.connectToDatabase()
	.then(async () => {
		// Assurez-vous que le seeding est exécuté uniquement une fois
		await seedDatabase(); // Exécuter le seed une seule fois

		// Démarrage du serveur après la génération des utilisateurs
		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Erreur de connexion à MongoDB :", err.message);
	});
