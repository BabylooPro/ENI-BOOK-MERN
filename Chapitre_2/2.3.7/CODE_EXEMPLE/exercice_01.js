// Nouvelle route /api
app.get("/api", (req, res) => {
	// Envoyer une réponse JSON quand cette route est accédée
	res.json({ message: "Bienvenue sur notre API" });
});
