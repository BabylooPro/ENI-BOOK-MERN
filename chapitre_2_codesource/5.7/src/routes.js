const express = require("express");
const router = express.Router();
const Utilisateur = require("./utilisateurs");

// Middleware pour valider les données de requête entrantes
router.use((req, res, next) => {
	if (req.body && typeof req.body !== "object") {
		return res
			.status(400)
			.json({ message: "Données de requête invalides." });
	}
	next();
});

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

// Route pour obtenir tous les utilisateurs avec pagination et filtrage (READ)
router.get("/utilisateurs", async (req, res) => {
	try {
		const {
			page = 1,
			limit = 10,
			nom,
			dateDeNaissance,
			dateInscription,
		} = req.query;

		// Filtrage dynamique basé sur les paramètres de requête
		const filtre = {};
		if (nom) filtre.nom = new RegExp(nom, "i");
		if (dateDeNaissance) filtre.dateDeNaissance = new Date(dateDeNaissance);
		if (dateInscription) filtre.dateInscription = new Date(dateInscription);

		// Pagination et limitation des résultats
		const utilisateurs = await Utilisateur.find(filtre)
			.select("nom email") // Optimisation: ne retourner que les champs nécessaires
			.limit(parseInt(limit))
			.skip((parseInt(page) - 1) * parseInt(limit));

		res.json(utilisateurs);
	} catch (erreur) {
		res.status(500).json({ message: erreur.message });
	}
});

// Route pour rechercher des utilisateurs par nom (READ)
router.get("/utilisateurs/recherche", async (req, res) => {
	try {
		const { nom } = req.query;
		if (!nom) {
			return res.status(400).json({
				message: "Le paramètre 'nom' est requis pour la recherche.",
			});
		}

		const utilisateurs = await Utilisateur.find({
			nom: new RegExp(nom, "i"),
		});
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
				new: true,
				runValidators: true,
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

// Route pour mettre à jour partiellement un utilisateur par ID (PATCH)
router.patch("/utilisateurs/:id", async (req, res) => {
	try {
		const utilisateur = await Utilisateur.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
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
