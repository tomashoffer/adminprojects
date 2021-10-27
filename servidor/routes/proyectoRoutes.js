// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const proyectoControllers = require('../controllers/proyectoControllers')
const authMiddleware = require('../middleware/authMiddleware')
const { check } = require('express-validator')

// crea proyectos 
// api/proyectos
router.post('/', 
authMiddleware,
[
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
], 
proyectoControllers.crearProyecto)

// Obtener todos los proyectos 
router.get('/', 
authMiddleware,
proyectoControllers.obtenerProyectos)

// Actualizar proyectos
router.put('/:id', 
authMiddleware,
[
    check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
], 
proyectoControllers.actualizarProyecto
)

// Eliminar proyecto 
router.delete('/:id', 
authMiddleware,
proyectoControllers.eliminarProyecto
)

module.exports = router;