require("dotenv").config(); // Charger les variables d'environnement
const { faker } = require("@faker-js/faker");
const Utilisateur = require("./utilisateurs"); // Importer le modèle Utilisateur

// Fonction pour générer des utilisateurs aléatoires
const genererUtilisateursAleatoires = async (nombre) => {
	const utilisateurs = [];

	for (let i = 0; i < nombre; i++) {
		const utilisateur = {
			nom: faker.person.fullName(), // Utilisation de faker.person.fullName()
			email: faker.internet.email(),
			motDePasse: faker.internet.password(8), // Générer un mot de passe aléatoire de 8 caractères
			dateDeNaissance: faker.date.past({
				years: 50,
				refDate: new Date("2003-01-01"),
			}), // Utilisation de la syntaxe correcte pour faker.date.past
		};
		utilisateurs.push(utilisateur);
	}

	try {
		console.log("Utilisateurs générés :", utilisateurs); // Log les utilisateurs générés
		// Insérer les utilisateurs générés dans la base de données
		await Utilisateur.insertMany(utilisateurs);
		console.log(
			`${nombre} utilisateurs aléatoires ont été générés et insérés avec succès.`
		);
	} catch (erreur) {
		console.error(
			"Erreur lors de l'insertion des utilisateurs aléatoires :",
			erreur.message
		);
	}
};

// Fonction principale de seed
const seedDatabase = async () => {
	try {
		const count = await Utilisateur.countDocuments();

		if (count > 0) {
			console.log(
				"Des utilisateurs existent déjà dans la base de données. Aucune donnée générée."
			);
		} else {
			console.log(
				"Aucun utilisateur trouvé. Génération de nouveaux utilisateurs..."
			);
			await genererUtilisateursAleatoires(10); // Générer 10 utilisateurs aléatoires
		}
	} catch (erreur) {
		console.error(
			"Erreur lors de la vérification des utilisateurs dans la base de données :",
			erreur.message
		);
	}
};

// Exporter la fonction de seed pour l'utiliser dans app.js
module.exports = seedDatabase;
