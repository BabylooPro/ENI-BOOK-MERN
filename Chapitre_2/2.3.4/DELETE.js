// Supprimer une ressource spécifique avec l'ID spécifié dans la base de données avec une requête DELETE
app.delete("/api/resources/:id", async (req, res) => {
	try {
		await Resource.findByIdAndDelete(req.params.id);
		res.status(204).send(); // Pas de contenu, mais réussite de la suppression
	} catch (error) {
		res.status(500).json({
			message: "Erreur lors de la suppression de la ressource.",
		});
	}
});
