const db = require('../database/dbindex');
const format = require('pg-format');

const ctrlGetProductos = async (req, res) =>  {
 
  const { order_by, categoria } = req.query;
  if(categoria){
      
  }
};

module.exports = {
  ctrlGetProductos,
} 