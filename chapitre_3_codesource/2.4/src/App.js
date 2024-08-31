import React, { useState } from "react"; // Import du hook useState
import "./App.css";

function App() {
	// Création d'un état 'count' initialisé à 0
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<header className="App-header">
				<h1>Hello World</h1>

				{/* Bouton pour incrémenter le compteur */}
				<button onClick={() => setCount(count + 1)}>Cliquez-moi</button>

				{/* Affichage du compteur */}
				<p>Compteur de clics : {count}</p>
			</header>
		</div>
	);
}

export default App;
