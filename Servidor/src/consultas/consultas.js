const pool = require('../database/dbindex') 
const bcrypt = require('bcryptjs')

const getPosts = async (email) => {
    const {rows} = await pool.query("select * from usuarios where email = $1", [email])
    return rows
}

const sendPosts = async (email,password,rol,lenguage) => {
    const passwordEncrypt =  bcrypt.hashSync(password)
    const clave = passwordEncrypt
    const {rows} = await pool.query("insert into usuarios(email,password,rol,lenguage) values ($1,$2,$3,$4)",
    [email,clave,rol,lenguage])
    return rows
}

const verificarCredenciales = async (email, password) => {
    const values = [email]
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const { rows: [usuario], rowCount } = await pool.query(consulta, values)
    const { password: passwordEncriptada } = usuario
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
    if (!passwordEsCorrecta || !rowCount)
    throw { code: 401, message: "Email o contraseña incorrecta" }
}

module.exports = {
    sendPosts,
    getPosts,
    verificarCredenciales
}