import React from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
	const { id } = useParams();
	return <h2>Profil de l'utilisateur {id}</h2>;
};

export default UserProfile;
