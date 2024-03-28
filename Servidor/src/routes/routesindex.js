const router = require('express').Router();
const joyasRouter = require('./rutas/rutasJoyas');

router.use('/', joyasRouter);

module.exports = router;