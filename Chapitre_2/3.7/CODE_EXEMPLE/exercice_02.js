// Middleware de journalisation personnalisé
app.use((req, res, next) => {
	// Stocke la méthode originale de la fonction 'end' pour l'appeler plus tard
	const originalSend = res.send;
	// Surcharge la méthode 'send' de la réponse
	res.send = function (data) {
		console.log(
			`Requête traitée : ${req.method} - ${req.originalUrl} - ${res.statusCode}`
		);
		// Appelle la méthode 'send' originale avec les données fournies
		originalSend.apply(res, arguments);
	};
	next();
});
