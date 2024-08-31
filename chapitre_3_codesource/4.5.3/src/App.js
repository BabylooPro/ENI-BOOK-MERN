import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Users from "./components/Users";
import UserProfile from "./components/UserProfile";
import Login from "./components/Login";
import ProductDetails from "./components/ProductDetails";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

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
						<li>
							<Link to="/dashboard">Tableau de bord</Link>
						</li>
					</ul>
				</nav>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/users" element={<Users />} />
					<Route path="/user/:id" element={<UserProfile />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/product/:productId"
						element={<ProductDetails />}
					/>
					<Route path="/dashboard" element={<Dashboard />}>
						<Route path="profile" element={<Profile />} />
						<Route path="settings" element={<Settings />} />
					</Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
