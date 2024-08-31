import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
	return (
		<div>
			<h2>Tableau de bord</h2>
			<nav>
				<ul>
					<li>
						<Link to="profile">Profil</Link>
					</li>
					<li>
						<Link to="settings">Paramètres</Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
};

export default Dashboard;
