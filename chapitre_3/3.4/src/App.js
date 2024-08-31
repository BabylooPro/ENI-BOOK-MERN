import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./styles/global.scss";

const App = () => {
	return (
		<div className="App">
			<Header />
			<main>
				{/* Contenu principal de l'application */}
				<p>
					Bienvenue dans notre application MERN avec un thème de
					couleurs personnalisé !
				</p>
			</main>
			<Footer />
		</div>
	);
};

export default App;
