const express = require('express');
const router = express.Router();
const {body,validationResult} = require('express-validator');
const { sendPosts, login } = require('../consultas/consultas');
// const jwt = require('jsonwebtoken');

router.post('/register', [
    // Validación de los campos
    body('user_nombre').notEmpty().trim().escape().withMessage('El nombre es obligatorio'),
    body('user_telefono').notEmpty(),
    body('user_perfil').notEmpty(),
    body('user_email').isEmail().withMessage('E-mail no valido'),
    body('user_password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
], async (req, res) => {
    // Manejo de errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Insertar datos en la base de datos
    try {
        const { user_nombre,user_email,user_telefono,user_perfil,user_password} = req.body;
        await sendPosts( user_nombre,user_email,user_telefono,user_perfil,user_password);
        res.status(201).send('Usuario registrado correctamente');
    } catch (error) {
        console.error('Error al insertar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.post('/login', [
    body('user_email').isEmail().withMessage('E-mail no valido'),
    body('user_password').notEmpty().withMessage('La contraseña debe tener al menos 8 caracteres'),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const { user_email, user_password } = req.body;
        const user = await login(user_email, user_password);
        res.status(200).json({ user });
          
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
        
    }  
})

module.exports = router