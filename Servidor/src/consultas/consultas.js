const pool = require('../database/dbindex') 
// const bcrypt = require('bcryptjs')


// const getPosts = async (user_email) => {
//     const {rows} = await pool.query("select * from usuarios where user_email = $1", [user_email])
//     return rows
// }

const sendPosts = async ( user_nombre,user_email,user_telefono,user_perfil,user_password) => {
    // const passwordEncrypt =  bcrypt.hashSync(user_password)
    // const clave = passwordEncrypt
    const {rows} = await pool.query("insert into usuarios( user_nombre,user_email,user_telefono,user_perfil,user_password) values ($1,$2,$3,$4,$5)",
    [ user_nombre,user_email,user_telefono,user_perfil,user_password])
    return rows
}

const login = async (user_email,user_password) => {
    const {rows} = await pool.query("select * from usuarios where user_email = $1 and user_password = $2", [user_email, user_password])
    return rows
}



module.exports = {
    sendPosts,
    login
    // getPosts,
    
}