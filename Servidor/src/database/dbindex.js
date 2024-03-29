require('dotenv').config();
const { Pool } = require('pg');
const { HOST, USER, PASSWORD, DATABASE } = process.env;

const db = new Pool({
	host: HOST,
	user: USER,
	password: PASSWORD,
	database: DATABASE,
	allowExitOnIdle: true,
});

db.connect((error, client, done) => {
	if (error) {
		console.log('Se produjo un error al conectarse a la base de datos', error);
	} else {
		console.log('Conexión a la base de datos con éxito');
	}
});

module.exports = db;