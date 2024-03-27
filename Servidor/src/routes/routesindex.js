const router = require('express').Router();
const joyasRouter = require('./rutas/rutasJoyas');

router.use('/joyas', joyasRouter);

module.exports = router;