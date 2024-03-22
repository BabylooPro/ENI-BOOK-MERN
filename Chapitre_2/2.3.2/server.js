const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello World avec Express.js !");
});

app.listen(port, () => {
	console.log(`Serveur Express écoutant sur le port ${port}`);
});
