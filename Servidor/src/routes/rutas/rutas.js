const router = require('express').Router();
const{
    ctrlGetProdfiltro,
    ctrlGetProdId,
    ctrlGetProductos,
    ctrlGetcategoria,
} = require ('../../controllers/ctrlIndex');

const { getProdfiltro } = ctrlGetProdfiltro;
const { getprodId } = ctrlGetProdId;
const { getProductos } = ctrlGetProductos;
const { getcategoria } = ctrlGetcategoria;

router.get('/prod', getProductos);
router.get('/prod/:id', getprodId);
router.get('/filter', getProdfiltro);
router.get('/cate', getcategoria);

module.exports = router;
