const db = require('../database/dbindex');
const { selectprod } = require('../database/querys/queryindex');

const getProductos = async (req, res) =>  {
 
  try {
    const { rowCount, rows } = await db.query(selectprod);
    if (rowCount > 0) {
        res.status(200).json({
            msg: 'Data fetch successfuly',
            dataCount: rowCount,
            data: rows,
        });
    } else {
        res.status(200).json({
            msg: 'No data found',
        });
    }		
} catch (error) {
    console.error('Error executing query:', error);
    res.status(400).json({
        status: 'Bad request',
        msg: error.message,
    });
}

};

module.exports = {
  getProductos,
} 