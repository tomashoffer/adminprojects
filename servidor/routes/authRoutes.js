// Rutas para autenticacion
const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers')
const { check } = require('express-validator')

// api/auth

router.post('/', [

    check('email', 'Agrega un email valido').isEmail(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({min: 6})

], authControllers.authUsuario);

module.exports = router;