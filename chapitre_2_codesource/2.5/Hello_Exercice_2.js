// Exercice 2: Script pour lire l'entrée utilisateur et afficher un message personnalisé
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

readline.question("Quel est votre nom ? ", (nom) => {
	console.log(`Hello, ${nom}.`);
	readline.close();
});
