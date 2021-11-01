const Usuario = require('../models/UsuarioModel')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => { 
    // revisar si hay errores
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    // extraer email y password
    const {email, password} = req.body;

    try{
        // Revisar que el usuario sea unico
        let usuario = await Usuario.findOne({ email });
        if(usuario){
            return res.status(400).json({msg: 'Usuario ya existe'})
        }
        // crea el nuevo usuario
        usuario = new Usuario(req.body)
        // hashear el password
        const salt = await bcrypt.genSalt(10)
        usuario.password = await bcrypt.hash(password, salt)
        // guardar ususario
        await usuario.save()
        // crear JWT y firmar (el token es el id, entonces va a utilizar la info del usuario actual)
        const payload = {
            usuario: {
                id: usuario.id
            }
        }
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error; 
            // mensaje de confirmacion
            res.json({ token })
        })

    }catch(error){
        console.log(error)
        res.status(400).send({msg:'Hubo un error'})
    }
}
