require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes/index_routes');
const prod = require('./src/routes/routesindex');
// middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Handle request
app.use((req, res, next) => {
	const method = req.method;
	const querys = req.query;
	const params = req.params;
	const path = req.originalUrl;
	const currentDate = new Date(Date.now());

	console.log(`
	Today ${currentDate}, \n 
	Method: ${method} \n 
	path: ${path} \n
	`);

	if (Object.keys(querys).length) console.table(querys);

	next();
});
// errors
app.use((error, req, res, next) => {
	res.status(500).send('Error en el servidor');
});

app.use("/", routes);
app.use("/", prod);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
