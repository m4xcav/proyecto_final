const db = require('../database/dbindex');
const { selectprod } = require('../database/querys/queryindex');

const getProductos = async (req, res) =>  {
    try {
        const { rowCount, rows } = await db.query(selectprod);
        if (rowCount > 0) {
            // Mapeamos los nombres de las variables
            const mappedRows = rows.map(row => ({
                id: row.prod_id,
                nombre: row.prod_nombre,
                descripcion: row.prod_descripcion,
                precio: row.prod_precio,
                stock: row.prod_stock,
                img: row.prod_img,
                categoria: row.categoria_name
            }));

            res.status(200).json({
                msg: 'Data fetch successfuly',
                dataCount: rowCount,
                data: mappedRows,
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