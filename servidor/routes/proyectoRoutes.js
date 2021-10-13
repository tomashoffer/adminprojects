// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const proyectoControllers = require('../controllers/proyectoControllers')
const authMiddleware = require('../middleware/authMiddleware')

// crea proyectos 
// api/proyectos
router.post('/', 
authMiddleware,
proyectoControllers.crearProyecto)

router.get('/', 
authMiddleware,
proyectoControllers.obtenerProyectos)

module.exports = router;