const router = require('express').Router();
const prod = require('./rutas/rutas');

router.use('/', prod);

module.exports = router;