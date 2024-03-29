const router = require('express').Router();
const{
    ctrlGetProdfiltro,
    ctrlGetProdId,
    ctrlGetProductos,
} = require ('../../controllers/ctrlIndex');

const { getProdfiltro } = ctrlGetProdfiltro;
const { getprodId } = ctrlGetProdId;
const { getProductos } = ctrlGetProductos;

router.get('/prod', getProductos);
router.get('/prod/:id', getprodId);
router.get('/filter', getProdfiltro);

module.exports = router;
