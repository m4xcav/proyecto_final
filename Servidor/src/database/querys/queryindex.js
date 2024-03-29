const prodid = `SELECT * FROM inventario WHERE id = $1`;
//aqui crear la querry con filtros llamas la const selectFiltros
const selectprod = `SELECT * FROM productos`
const selectprodf = `SELECT * FROM productos ORDER BY %s %s`
const selectprodfiltro = `SELECT * FROM productos WHERE catgoria_id = %s ORDER BY %s %s`
module.exports = {
	selectprod,
	selectprodfiltro,
	prodid,
	selectprodf,
};