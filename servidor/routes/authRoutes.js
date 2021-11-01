// Rutas para autenticacion
const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers')
const authMiddleware = require('../middleware/authMiddleware')
const { check } = require('express-validator')

// Iniciar Sesión
// api/auth
router.post('/', authControllers.authUsuario);

// obtiene usuario autenticado
router.get('/', 
    authMiddleware,
    authControllers.usuarioAutenticado
)

module.exports = router;