require("dotenv").config();
const mongoose = require("mongoose");

// Connexion a MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Creation d'un schema pour l'utilisateur
const utilisateurSchema = new mongoose.Schema({
	nom: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	motDePasse: {
		type: String,
		required: true,
	},
	dateDeNaissance: {
		type: Date,
	},
	dateInscription: {
		type: Date,
		default: Date.now,
	},
});

// Creation d'un modele a partir du schema
const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

// Fonction pour ajouter un nouvel utilisateur
async function ajouterUtilisateur(nom, email, motDePasse, dateDeNaissance) {
	try {
		const nouvelUtilisateur = new Utilisateur({
			nom,
			email,
			motDePasse,
			dateDeNaissance,
		});
		const resultat = await nouvelUtilisateur.save();
		console.log("Utilisateur ajoute avec succes :", resultat);
	} catch (erreur) {
		console.error(
			"Erreur lors de l'ajout de l'utilisateur :",
			erreur.message
		);
	}
}

// Exemple d'utilisation de la fonction pour ajouter un utilisateur
ajouterUtilisateur(
	"Jean Dupont",
	"jean.dupont@example.com",
	"motdepasse123",
	new Date("1990-01-01")
);
