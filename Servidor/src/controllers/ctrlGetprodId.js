const db = require('../database/dbindex');
const format = require('pg-format');
const { prodid } = require('../database/querys/queryindex');

const getprodId = async (req, res) => {
    const id = Number(req.params.id)
    if(id === undefined){
        console.log('invalid or missing ID');
    }else{
        try {
            const { rowCount, rows } = await db.query(prodid, [id]);
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
    }
    
}

module.exports = {
    getprodId,
}