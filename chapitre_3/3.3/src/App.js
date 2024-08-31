import React from "react";
import Button from "./Button";
import "./App.scss";

function App() {
	const handleClick = () => {
		alert("Button clicked!");
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>Welcome to My App</h1>
				<Button label="Click Me" onClick={handleClick} />
			</header>
		</div>
	);
}

export default App;
