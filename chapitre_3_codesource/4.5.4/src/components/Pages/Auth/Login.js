import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
	const navigate = useNavigate();

	const handleLogin = () => {
		// Logique de connexion (par exemple, vérification des identifiants)
		// Si la connexion est réussie
		onLogin();
		navigate("/dashboard");
	};

	return (
		<div>
			<h2>Connexion</h2>
			<button onClick={handleLogin}>Se connecter</button>
		</div>
	);
};

export default Login;
