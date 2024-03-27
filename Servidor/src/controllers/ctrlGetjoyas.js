const db = require('../database/dbindex');
const format = require('pg-format');
const { prepararHATEOAS }  = require('./hateoas');
const { selectJoyas } = require('../database/querys/queryindex');

const getTodoJoyas = async (req, res) => {
    const { limits, order_by, page } = req.query;

    // Validaciones
    let esValido = true;

    // Validar limits y page no menores a 1
    if (parseInt(limits) <= 0 || parseInt(page) <= 0) {
		esValido = false;
	}
    // Validar order_by
    const orderbyPermitido = [
        'prod_stock-ASC',
        'prod_stock-DESC',
        'prod_precio-ASC',
        'prod_precio-DESC',
    ];

    if (!orderbyPermitido.includes(order_by)) {
        esValido = false;
    }


    if (!esValido) {
        return res.status(400).json({
            msg: 'Invalid query parameters'
        });
    }

    const [campo, direccion] = order_by.split("-");
    const offset = (page - 1) * limits;
    const formattedQuery = format(selectJoyas, campo, direccion, limits, offset);

    try {
        const joyas = await db.query(formattedQuery);
		const formatohetoas = await prepararHATEOAS(joyas.rows); 
		console.log('Contenido de HATEOAS:', formatohetoas); 
		const totalJoyas = joyas.rowCount
		if (totalJoyas > 0) {
    		res.status(200).json(formatohetoas);
		} else {
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
};

module.exports = {
    getTodoJoyas,
};
