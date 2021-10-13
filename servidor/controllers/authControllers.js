const Usuario = require('../models/UsuarioModel')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authUsuario = async (req, res) => { 
    // revisar si hay errores
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    // extraer el email y password
    const { email, password } = req.body;

    try{
        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({ email });
        if(!usuario){
            return res.status(400).json({msg: 'Usuario no existe'})
        }
        // Revisar el password
        const passCorrecto = await bcrypt.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg: 'Password Incorrecto'})
        }

        // Si todo es correcto crear JWT y firmar 
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
            res.json({token})
        })


    }catch(err){
        console.log(err)
    }
}