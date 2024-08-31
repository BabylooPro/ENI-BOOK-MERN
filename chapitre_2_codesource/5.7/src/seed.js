require("dotenv").config();
const { faker } = require("@faker-js/faker");
const Utilisateur = require("./utilisateurs");

// Fonction pour générer des mots de passe conformes
const genererMotDePasseConforme = () => {
	const caracteresSpeciaux = "@$!%*?&";
	const majuscule = faker.helpers.arrayElement("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
	const minuscule = faker.helpers.arrayElement("abcdefghijklmnopqrstuvwxyz");
	const chiffre = faker.helpers.arrayElement("0123456789");
	const caractereSpecial = faker.helpers.arrayElement(caracteresSpeciaux);

	const autresCaracteres = faker.string.alphanumeric(4);

	const motDePasse =
		majuscule + minuscule + chiffre + caractereSpecial + autresCaracteres;

	// Mélanger les caractères pour éviter toute prévisibilité
	return motDePasse
		.split("")
		.sort(() => 0.5 - Math.random())
		.join("");
};

// Fonction pour générer des utilisateurs aléatoires avec options personnalisées
const genererUtilisateursAleatoires = async (nombre, options = {}) => {
	const utilisateurs = [];

	for (let i = 0; i < nombre; i++) {
		const utilisateur = {
			nom: faker.person.fullName(),
			email: faker.internet.email(),
			motDePasse: genererMotDePasseConforme(),
			dateDeNaissance:
				options.dateDeNaissance ||
				faker.date.past({ years: 50, refDate: new Date("2003-01-01") }),
		};
		utilisateurs.push(utilisateur);
	}

	try {
		console.log("Utilisateurs générés :", utilisateurs);
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

// Fonction principale de seed avec options personnalisées
const seedDatabase = async (options = {}) => {
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
			await genererUtilisateursAleatoires(10, options);
		}
	} catch (erreur) {
		console.error(
			"Erreur lors de la vérification des utilisateurs dans la base de données :",
			erreur.message
		);
	}
};

module.exports = seedDatabase;
