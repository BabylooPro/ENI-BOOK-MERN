const { MongoClient } = require("mongodb");

// Remplacez <password> par votre mot de passe MongoDB réel
const uri =
	"mongodb+srv://ENI-BOOK-MERN:<password>@cluster0.hgjhtlh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Créez une nouvelle instance de MongoClient sans options obsolètes
const client = new MongoClient(uri);

async function run() {
	try {
		// Connectez-vous au cluster MongoDB
		await client.connect();
		console.log("Connecté avec succès à MongoDB");
	} catch (err) {
		console.error("Erreur lors de la connexion à MongoDB:", err);
	} finally {
		// Fermez la connexion au cluster MongoDB
		await client.close();
	}
}

run().catch(console.dir);
