import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
	return <h2>Accueil</h2>;
}

function About() {
	return <h2>À propos</h2>;
}

function Users() {
	return <h2>Utilisateurs</h2>;
}

function App() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Accueil</Link>
						</li>
						<li>
							<Link to="/about">À propos</Link>
						</li>
						<li>
							<Link to="/users">Utilisateurs</Link>
						</li>
					</ul>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/users" element={<Users />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
