const fs = require('fs');
const { Pool } = require('pg');

// Configura la conexión a la base de datos
const pool = new Pool({
  user: 'sublikkar_user',
  host: 'dpg-co9ljvq0si5c739emhl0-a.oregon-postgres.render.com',
  database: 'sublikkar',
  password: 'u30h5ZEeoJ1Hv2vtcJtVGkckP2Cwmh73',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});
// Lee el contenido binario de la imagen desde el archivo
const agenda1 = '../../img/agenda1.png';
const agenda2 = '../../img/agenda2.png';
const agenda3 = '../../img/agenda3.png';
const body1 = '../../img/body1.png';
const franela1 = '../../img/franela1.png';
const franela2 = '../../img/franela2.png';
const taza1 = '../../img/taza1.png';
const taza2 = '../../img/taza2.png';
const taza3 = '../../img/taza3.png';
const vasos1 = '../../img/vasos1.png';
const imgData = fs.readFileSync(agenda1);
const imgData2 = fs.readFileSync(agenda2);
const imgData3= fs.readFileSync(agenda3);
const imgData4= fs.readFileSync(body1);
const imgData5= fs.readFileSync(franela1);
const imgData6= fs.readFileSync(franela2);
const imgData7= fs.readFileSync(taza1);
const imgData8= fs.readFileSync(taza2);
const imgData9= fs.readFileSync(taza3);
const imgData10= fs.readFileSync(vasos1);
const data = [
    {
        nombre: "agenda v",
        descripcion: "agenda azul V",
        precio: 5000,
        stock: 200,
        cateroria: 1,
        img: imgData,
    },
    {
        nombre: "agenda c",
        descripcion: "agenda mas boligrafo",
        precio: 5200,
        stock: 10,
        cateroria: 1,
        img: imgData2,
    },
    {
        nombre: "agenda a",
        descripcion: "agenda personalizada",
        precio: 5300,
        stock: 260,
        cateroria: 1,
        img: imgData3,
    },
    {
        nombre: "body",
        descripcion: "body infante personalizado",
        precio: 15000,
        stock: 20,
        cateroria: 2,
        img: imgData4,
    },
    {
      nombre: "franela a",
      descripcion: "franela infante azul",
      precio: 25000,
      stock: 22,
      cateroria: 3,
      img: imgData5,
    },
    {
        nombre: "franela r",
        descripcion: "franela personalizada rosa",
        precio: 24000,
        stock: 290,
        cateroria: 3,
        img: imgData6,
    },
    {
      nombre: "taza elegant",
      descripcion: "taza personalizada elegant",
      precio: 5000,
      stock: 300,
      cateroria: 4,
      img: imgData7,
    },
    {
      nombre: "taza azul",
      descripcion: "taza azul personalizada",
      precio: 5800,
      stock: 700,
      cateroria: 4,
      img: imgData8,
  },
  {
      nombre: "taza diseño",
      descripcion: "taza personalizada",
      precio: 5200,
      stock: 900,
      cateroria: 4,
      img: imgData9,
  },
  {
      nombre: "vasos",
      descripcion: "vasos vineros personalizados",
      precio: 5300,
      stock: 50,
      cateroria: 5,
      img: imgData10,
  },
 
]
// Ejecuta la consulta SQL para insertar la imagen en la tabla
const insertQuery = 'INSERT INTO public.productos (prod_nombre, prod_descripcion, prod_precio, prod_stock, catgoria_id, prod_img) VALUES ($1, $2, $3, $4, $5, $6)';

data.forEach(item => {
  // Ejecuta la consulta SQL para insertar cada producto en la tabla
  pool.query(insertQuery, [item.nombre, item.descripcion, item.precio, item.stock, item.cateroria, item.img], (err, res) => {
    if (err) {
      console.error('Error al insertar el producto:', err);
    } else {
      console.log('Producto insertado correctamente');
    }
  });
});

// Cierra la conexión a la base de datos después de que todas las consultas se completen
pool.end();

