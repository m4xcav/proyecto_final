const db = require('../database/dbindex');
const { selectprodfiltro } = require('../database/querys/queryindex');
const { selectprodf } = require('../database/querys/queryindex');
const format = require('pg-format');

const getProdfiltro = async (req, res) => {
    const {orderby, categoria} = req.query;
    if(!orderby){
        return res.status(400).json({ msg: 'Faltan orden requerido' });
    }
    let esValido = true;
    const orderbyPermitido = [
        'prod_stock-ASC',
        'prod_stock-DESC',
        'prod_precio-ASC',
        'prod_precio-DESC',
    ];
    if (!orderbyPermitido.includes(orderby)) {
        esValido = false;
    }
    if (!esValido) {
        return res.status(400).json({
            msg: 'Invalid query parameters'
        });
    }
    if(!categoria){
    const [campo, direccion] = orderby.split("-");
    const formattedQuery = format(selectprodf, campo, direccion);
    try {
        const prod = await db.query(formattedQuery);
        if(prod.rowCount > 0){
            res.status(200).json(prod);
        }else{
            res.status(200).json({
                msg: 'No data found',
                });
        }
    } catch (error) {
        res.status(400).send({
            status: 'Bad request',
            msg: error,
        });
    }
    }else{
    const [campo, direccion] = orderby.split("-");
    const formattedQuery = format(selectprodfiltro, categoria, campo, direccion);
    try {
        const prod = await db.query(formattedQuery);
        if(prod.rowCount > 0){
            res.status(200).json(prod);
        }else{
            res.status(200).json({
                msg: 'No data found',
                });
        }
    } catch (error) {
        res.status(400).send({
            status: 'Bad request',
            msg: error,
        });
    }
    }
    
};

module.exports = {
    getProdfiltro,
}

