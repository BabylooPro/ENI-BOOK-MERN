const Joi = require("joi"); // Assurez-vous d'avoir installé Joi avec npm ou yarn
const express = require("express");
const app = express();
app.use(express.json()); // Middleware pour parser les corps de requête en JSON

// Définition du schéma Joi pour la validation
const schema = Joi.object({
	nom: Joi.string().min(3).required(),
	email: Joi.string().email().required(),
});

app.post("/submit", (req, res) => {
	// Validation de la requête avec le schéma Joi
	const { error, value } = schema.validate(req.body);

	if (error) {
		// Si la validation échoue, renvoie un message d'erreur
		return res
			.status(400)
			.json({ message: "Validation error", error: error.details });
	}

	// Si les données sont valides, procède avec les données
	// (Pour cet exemple, nous allons juste renvoyer les données validées)
	res.status(200).json({
		message: "Validation réussie",
		data: value,
	});
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
