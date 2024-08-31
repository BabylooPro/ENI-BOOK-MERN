require("dotenv").config();
const { MongoClient } = require("mongodb");

async function principal() {
	const uri = process.env.MONGODB_URI;

	const client = new MongoClient(uri);

	try {
		// Connection au Cluster MongoDB
		await client.connect();

		console.log("Connection avec succès à MongoDB");

		// Effectuer des opérations
		const baseDeDonnees = client.db("maPremiereBaseDeDonnees");
		const collection = baseDeDonnees.collection("maCollection");

		// Exemple de document
		const document = { nom: "John", age: 30, ville: "New York" };
		await collection.insertOne(document);

		console.log("Document inséré");
	} catch (erreur) {
		console.error(erreur);
	} finally {
		await client.close();
	}
}

principal().catch(console.error);
