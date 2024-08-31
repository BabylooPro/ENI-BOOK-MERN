require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // Middleware pour analyser les requetes JSON

// Connexion a MongoDB
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log("Connexion a MongoDB reussie");
	})
	.catch((err) => {
		console.error("Erreur de connexion a MongoDB :", err.message);
	});

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

// Route pour ajouter un nouvel utilisateur (CREATE)
app.post("/utilisateurs", async (req, res) => {
	try {
		const nouvelUtilisateur = new Utilisateur(req.body);
		const resultat = await nouvelUtilisateur.save();
		res.status(201).json(resultat);
	} catch (erreur) {
		res.status(400).json({ message: erreur.message });
	}
});

// Route pour obtenir tous les utilisateurs (READ)
app.get("/utilisateurs", async (req, res) => {
	try {
		const utilisateurs = await Utilisateur.find();
		res.json(utilisateurs);
	} catch (erreur) {
		res.status(500).json({ message: erreur.message });
	}
});

// Route pour obtenir un utilisateur par ID (READ)
app.get("/utilisateurs/:id", async (req, res) => {
	try {
		const utilisateur = await Utilisateur.findById(req.params.id);
		if (utilisateur == null) {
			return res.status(404).json({ message: "Utilisateur non trouve" });
		}
		res.json(utilisateur);
	} catch (erreur) {
		res.status(500).json({ message: erreur.message });
	}
});

// Route pour mettre a jour un utilisateur par ID (UPDATE)
app.put("/utilisateurs/:id", async (req, res) => {
	try {
		const utilisateur = await Utilisateur.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true, // Renvoie l'utilisateur mis a jour
				runValidators: true, // Execute les validateurs sur les donnees mises a jour
			}
		);
		if (utilisateur == null) {
			return res.status(404).json({ message: "Utilisateur non trouve" });
		}
		res.json(utilisateur);
	} catch (erreur) {
		res.status(400).json({ message: erreur.message });
	}
});

// Route pour supprimer un utilisateur par ID (DELETE)
app.delete("/utilisateurs/:id", async (req, res) => {
	try {
		const utilisateur = await Utilisateur.findByIdAndDelete(req.params.id);
		if (utilisateur == null) {
			return res.status(404).json({ message: "Utilisateur non trouve" });
		}
		res.json({ message: "Utilisateur supprime avec succes" });
	} catch (erreur) {
		res.status(500).json({ message: erreur.message });
	}
});

// Demarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Serveur en cours d'execution sur le port ${PORT}`);
});
