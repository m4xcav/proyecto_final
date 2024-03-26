const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes/index_routes');


app.use(cors());
app.use(express.json());

app.use("/", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
