require("dotenv").config();
const { MongoClient } = require("mongodb");

async function main() {
	const uri = process.env.MONGODB_URI;

	const client = new MongoClient(uri);

	try {
		// Connection au Cluster MongoDB
		await client.connect();

		console.log("Connection avec succès à MongoDB");

		// Liste de base de données
		const databasesList = await client.db().admin().listDatabases();
		console.log("Base de données:");
		databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

main().catch(console.error);
