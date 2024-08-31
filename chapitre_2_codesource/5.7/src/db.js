const mongoose = require("mongoose");

// Fonction pour se connecter à la base de données MongoDB
const connectToDatabase = async () => {
	try {
		if (mongoose.connection.readyState === 0) {
			// Vérifier si une connexion n'existe pas déjà
			await mongoose.connect(process.env.MONGODB_URI, {
				dbName: "db_5_6", // Utilisation d'un nom de base de données valide sans caractères spéciaux
			});
			console.log("Connexion à MongoDB réussie");
		}
	} catch (err) {
		console.error("Erreur de connexion à MongoDB :", err.message);
		process.exit(1); // Arrête le processus en cas d'échec de connexion
	}

	// Événements Mongoose pour surveiller la connexion
	mongoose.connection.on("connected", () => {
		console.log("Mongoose est connecté à MongoDB");
	});

	mongoose.connection.on("error", (err) => {
		console.error(`Erreur de connexion Mongoose : ${err.message}`);
	});

	mongoose.connection.on("disconnected", () => {
		console.log("Mongoose est déconnecté de MongoDB");
	});
};

// Exportation de la fonction de connexion pour utilisation dans app.js
module.exports = { connectToDatabase };
