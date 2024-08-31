const express = require("express");
const router = express.Router();

// Importer le modèle Utilisateur
const Utilisateur = require("./utilisateurs");

// Route pour ajouter un nouvel utilisateur (CREATE)
router.post("/utilisateurs", async (req, res) => {
	try {
		const nouvelUtilisateur = new Utilisateur(req.body);
		const resultat = await nouvelUtilisateur.save();
		res.status(201).json(resultat);
	} catch (erreur) {
		res.status(400).json({ message: erreur.message });
	}
});

// Route pour obtenir tous les utilisateurs (READ)
router.get("/utilisateurs", async (req, res) => {
	try {
		const utilisateurs = await Utilisateur.find();
		res.json(utilisateurs);
	} catch (erreur) {
		res.status(500).json({ message: erreur.message });
	}
});

// Route pour obtenir un utilisateur par ID (READ)
router.get("/utilisateurs/:id", async (req, res) => {
	try {
		const utilisateur = await Utilisateur.findById(req.params.id);
		if (utilisateur == null) {
			return res.status(404).json({ message: "Utilisateur non trouvé" });
		}
		res.json(utilisateur);
	} catch (erreur) {
		res.status(500).json({ message: erreur.message });
	}
});

// Route pour mettre à jour un utilisateur par ID (UPDATE)
router.put("/utilisateurs/:id", async (req, res) => {
	try {
		const utilisateur = await Utilisateur.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true, // Renvoie l'utilisateur mis à jour
				runValidators: true, // Exécute les validateurs sur les données mises à jour
			}
		);
		if (utilisateur == null) {
			return res.status(404).json({ message: "Utilisateur non trouvé" });
		}
		res.json(utilisateur);
	} catch (erreur) {
		res.status(400).json({ message: erreur.message });
	}
});

// Route pour supprimer un utilisateur par ID (DELETE)
router.delete("/utilisateurs/:id", async (req, res) => {
	try {
		const utilisateur = await Utilisateur.findByIdAndDelete(req.params.id);
		if (utilisateur == null) {
			return res.status(404).json({ message: "Utilisateur non trouvé" });
		}
		res.json({ message: "Utilisateur supprimé avec succès" });
	} catch (erreur) {
		res.status(500).json({ message: erreur.message });
	}
});

module.exports = router;
