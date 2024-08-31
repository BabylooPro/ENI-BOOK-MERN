// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
	const err = new Error("Non Trouvé");
	err.status = 404;
	next(err);
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
	// Log de l'erreur pour le débogage
	console.error(err.stack);
	// Définit le code de statut de la réponse
	const statusCode = err.status || 500;
	// Envoie la réponse d'erreur
	res.status(statusCode).json({
		message: err.message,
		error: app.get("env") === "development" ? err : {},
	});
});
