import React from "react";
import "./Button.scss";

function Button({ label, onClick }) {
	return (
		<button className="custom-button" onClick={onClick}>
			{label}
		</button>
	);
}

export default Button;
