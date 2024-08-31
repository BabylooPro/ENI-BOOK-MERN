import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./components/Pages/Home/Home";
import About from "./components/Pages/About/About";
import Users from "./components/Pages/Dashboard/Users/Users";
import UserProfile from "./components/Pages/Dashboard/Users/UserProfile";
import Login from "./components/Pages/Auth/Login";
import ProductDetails from "./components/Pages/Product/ProductDetails";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Profile from "./components/Pages/Dashboard/Users/Profile";
import Settings from "./components/Pages/Dashboard/Settings/Settings";
import PageTransition from "./components/UI/PageTransition";
import ProtectedRoute from "./components/Pages/Auth/ProtectedRoute";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const location = useLocation();

	return (
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
			<AnimatePresence mode="wait">
				<Routes location={location} key={location.pathname}>
					<Route
						path="/"
						element={
							<PageTransition>
								<Home />
							</PageTransition>
						}
					/>
					<Route
						path="/about"
						element={
							<PageTransition>
								<About />
							</PageTransition>
						}
					/>
					<Route
						path="/users"
						element={
							<PageTransition>
								<Users />
							</PageTransition>
						}
					/>
					<Route
						path="/user/:id"
						element={
							<PageTransition>
								<UserProfile />
							</PageTransition>
						}
					/>
					<Route
						path="/login"
						element={
							<PageTransition>
								<Login
									onLogin={() => setIsAuthenticated(true)}
								/>
							</PageTransition>
						}
					/>
					<Route
						path="/product/:productId"
						element={
							<PageTransition>
								<ProductDetails />
							</PageTransition>
						}
					/>
					{/* Utilisation de ProtectedRoute pour protéger le Dashboard */}
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute isAuthenticated={isAuthenticated}>
								<PageTransition>
									<Dashboard />
								</PageTransition>
							</ProtectedRoute>
						}
					>
						{/* Sous-routes protégées du Dashboard */}
						<Route
							path="profile"
							element={
								<PageTransition>
									<Profile />
								</PageTransition>
							}
						/>
						<Route
							path="settings"
							element={
								<PageTransition>
									<Settings />
								</PageTransition>
							}
						/>
					</Route>
				</Routes>
			</AnimatePresence>
		</div>
	);
}

export default App;
