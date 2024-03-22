// Obtenir toutes les instances de ressources dans la base de données avec une requête GET
app.get("api/resources", async (req, res) => {
	// Tentative de récupération de toutes les ressources
	try {
		const resources = await Resource.find(); // Obtention de toutes les ressources
		res.status(200).json(resources); // Reponse avec le code 200 avec les ressources récupérées
	} catch (error) {
		// Si une erreur se produit, ça renverrai une erreur 500
		res.status(500).json({
			message: "Error lors de la récupération des ressources.",
		});
	}
});

// Obtenir une instance  spécifique de ressource avec l'ID
app.get("api/resources/:id", async (req, res) => {
	// Tentative de récupération de la ressource spécifique avec l'ID spécifié mais si une erreur se produit, ça renverrai une erreur 500
	try {
		const resource = await Resource.findById(req.params.id); // 1Obtention de la ressource spécifique avec l'ID spécifié
		if (!resource) {
			return res.status(404).json({ message: "Ressource non trouvée" }); // Si la ressource n'est trouvée, renvoyer une erreur 404
		}
	} catch (error) {
		res.status(500).json({
			message: "Erreur lors de la récupération de la ressource.",
		});
	}
});
