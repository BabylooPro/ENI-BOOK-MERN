import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Users from "./components/Users";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";

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
						<li>
							<Link to="/login">Connexion</Link>
						</li>
					</ul>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/users" element={<Users />} />
					<Route path="/user/:id" element={<UserProfile />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
