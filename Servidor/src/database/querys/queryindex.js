const selectJoyas = `SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s`;
const joyaid = `SELECT * FROM inventario WHERE id = $1`;
//aqui crear la querry con filtros llamas la const selectFiltros
const selectFiltros = `SELECT * FROM inventario`;
const selectprod = `SELECT * FROM productos ODER BY %s`
const selectprodfiltro = `SELECT * FROM productos WHERE catgoria_id = %s ORDER BY %s`
module.exports = {
	selectJoyas,
	selectFiltros,
	joyaid,
};