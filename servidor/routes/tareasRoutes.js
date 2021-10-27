// Rutas para crear tareas
const express = require('express');
const router = express.Router();
const tareasControllers = require('../controllers/tareasControllers')
const authMiddleware = require('../middleware/authMiddleware')
const { check } = require('express-validator')

// api/tareas
// crear tareas
router.post('/',
authMiddleware,
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty()
],
[
    check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
],
tareasControllers.crearTarea);

// Obtener tareas
router.get('/',
authMiddleware,
tareasControllers.obtenerTareas)

// actualizar tarea
router.put('/:id',
authMiddleware,
tareasControllers.actualizarTareas)

// eliminar tarea
router.delete('/:id',
authMiddleware,
tareasControllers.eliminarTareas)

module.exports = router;