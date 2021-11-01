// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioControllers = require('../controllers/usuarioControllers')
const { check } = require('express-validator')

// Crea un usuarios 
// api/auth

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'Password debe tener al menos 6 caracteres').isLength({min: 6})

], usuarioControllers.crearUsuario);

module.exports = router;