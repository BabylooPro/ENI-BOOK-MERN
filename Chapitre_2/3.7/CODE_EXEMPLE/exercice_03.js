// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Route pour traiter les requêtes POST à `/submit`
app.post("/submit", (req, res) => {
	// Valider les données reçues
	if (!req.body.nom || !req.body.email) {
		// Si des données obligatoires sont manquantes, renvoie une erreur 400
		return res.status(400).send("Le nom et l'email sont requis.");
	}
	// Si les données sont valides, envoie une réponse de succès
	res.status(200).json({
		message: "Données reçues avec succès",
		donnéesReçues: req.body,
	});
});
