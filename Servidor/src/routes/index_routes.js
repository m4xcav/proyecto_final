const express = require('express');
const router = express.Router();


router.get ('/', async (req, res) => {
    res.send('get');
});
router.post ('/', async (req, res) => {
    res.send('post');
});
router.put ('/', async (req, res) => {
    res.send('put');
});


module.exports = router