const mongoose = require("mongoose");

// Définition du schéma pour l'utilisateur
const utilisateurSchema = new mongoose.Schema({
	nom: {
		type: String,
		required: [true, "Le nom est requis."],
		trim: true,
	},
	email: {
		type: String,
		required: [true, "l'email est requis."],
		unique: true,
		trim: true,
		lowercase: true,
		match: [/.+\@.+\..+/, "Veuillez entrer un email valide."],
	},
	motDePasse: {
		type: String,
		required: [true, "Le mot de passe est requis."],
		minlength: [6, "Le mot de passe doit contenir au moins 6 caractères."],
	},
	dateDeNaissance: {
		type: Date,
	},
	dateInscription: {
		type: Date,
		default: Date.now,
	},
});

// Méthode de modèle pour masquer les informations sensibles (ex. mot de passe)
utilisateurSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.motDePasse;
	return obj;
};

// Création du modèle Utilisateur à partir du schéma
const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

module.exports = Utilisateur;
