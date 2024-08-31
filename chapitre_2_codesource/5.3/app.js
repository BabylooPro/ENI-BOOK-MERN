require("dotenv").config();
const mongoose = require("mongoose");

async function principal() {
	try {
		// Connexion à MongoDB avec Mongoose
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("Connection avec succès à MongoDB avec Mongoose");

		// Définir un schéma et un modèle
		const utilisateurSchema = new mongoose.Schema({
			nom: String,
			age: Number,
			ville: String,
		});

		const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

		// Créer un nouveau document
		const nouvelUtilisateur = new Utilisateur({
			nom: "John",
			age: 30,
			ville: "New York",
		});

		// Sauvegarder le document dans la collection 'utilisateurs'
		await nouvelUtilisateur.save();
		console.log("Document inséré avec Mongoose");
	} catch (erreur) {
		console.error("Erreur de connexion à MongoDB", erreur);
	} finally {
		// Fermer la connexion lorsque toutes les opérations sont terminées
		mongoose.connection.close();
	}
}

principal().catch(console.error);
