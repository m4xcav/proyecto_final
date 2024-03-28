const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const {getPosts,sendPosts,verificarCredenciales} = require ('../consultas/consultas')



router.get('/usuarios', async (req, res) => {
   

    try {
        const token = req.headers.authorization.split (" ")[1];
        let correoElectronico = "";
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                console.log('Error al decodificar el token:', err);
                
            } else {
                 correoElectronico = decoded.email; 
            }
        });
        const results = await getPosts(correoElectronico);
        res.send(results)
        
    } catch (error) {
        res.status(500).json({
            message: "acceso no autorizado"
        })
        
    }
})


router.post('/usuarios', async (req, res) => {
    const {email,password,rol,lenguage} = req.body;
    await sendPosts(email,password,rol,lenguage);
    res.send('datos agregados')
})

router.post('/login', async (req, res) => {
    try {
        const {email,password} = req.body
        await verificarCredenciales(email,password)
        const token = jwt.sign({email}, process.env.SECRET,{
            expiresIn: "1h" 
        
        })
       

        res.json({token})
        
    } catch (error) {
        res.status(404),
        res.json({message:error.message})
        
    }
})


module.exports = router