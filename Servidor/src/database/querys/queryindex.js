const prodid = `SELECT * FROM inventario WHERE id = $1`;
//aqui crear la querry con filtros llamas la const selectFiltros
const selectprod = `SELECT p.prod_id, p.prod_nombre, p.prod_descripcion, p.prod_precio, p.prod_stock, p.prod_img, c.categoria_name
FROM public.productos p
INNER JOIN public.categoria c ON p.catgoria_id = c.categoria_id;
`
const selectprodf = `SELECT * FROM productos ORDER BY %s %s`
const selectprodfiltro = `SELECT * FROM productos WHERE catgoria_id = %s ORDER BY %s %s`
module.exports = {
	selectprod,
	selectprodfiltro,
	prodid,
	selectprodf,
};