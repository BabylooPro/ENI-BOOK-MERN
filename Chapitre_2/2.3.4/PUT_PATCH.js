// Mise a jour d'une ressource spécifique avec l'ID spécifié dans la base de donnles avec une requête PUT
app.put("/api/resources/:id", async (req, res) => {
	// Tentative de mise à jour de la ressource avec l'ID spécifié mais si une erreur se produit, ça renverrai une erreur 400
	try {
		const updatedRessource = await Resource.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		res.status(200).json(updatedRessource);
	} catch (error) {
		res.status(400).json({
			message: "Erreur lors de la mise à jour de la ressource.",
		});
	}
});
