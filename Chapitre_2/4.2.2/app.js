require("dotenv").config();

// Utiliser les variables d'environnement
const uri = process.env.MONGODB_URI;
const apiKey = process.env.API_KEY;

const { MongoClient } = require("mongodb");

// Créez une nouvelle instance de MongoClient sans options obsolètes
const client = new MongoClient(uri);

async function run() {
	try {
		await client.connect();
		console.log("Connecté avec succès à MongoDB");

		// Vous pouvez utiliser l'API_KEY ici, par exemple pour appeler un service externe
		console.log(`Votre clé API est: ${apiKey}`);
	} catch (err) {
		console.error("Erreur lors de la connexion à MongoDB:", err);
	} finally {
		await client.close();
	}
}

run().catch(console.dir);
