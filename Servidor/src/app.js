require('./database/dbindex');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/routesindex');

const app = express();

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
// Routes
app.use('/', routes);
module.exports = app;
