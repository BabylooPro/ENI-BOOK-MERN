// Création d'une nouvelle ressource dans la base de données avec une requête POST
app.post("/api/resources", async (req, res) => {
	// Création d'une nouvelle instance de ressource avec les données du corps de la requête
	const nouvelleRessource = new Resource(req.body);

	// Tentative de sauvegarde de la ressource dans la base de données
	try {
		const savedRessource = await nouvelleRessource.save(); // Sauvegarde de la ressource
		res.status(201).json(savedRessource); // Réponse avec le code 201 et la ressource sauvegardée
	} catch (error) {
		// Si une erreur se produit, ça renverrai une erreur 400
		res.status(400).json({
			message: "Erreur lors de la création de la ressource.",
		});
	}
});
