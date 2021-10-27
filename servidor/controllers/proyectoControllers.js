const Proyecto = require('../models/ProyectoModel')
const { validationResult } = require('express-validator')
 
exports.crearProyecto = async (req, res) => { 

// Revisar si hay errores
   const errors = validationResult(req)
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
   }

    try {
        // crear nuevo proyectos
        const proyecto = await new Proyecto(req.body);

        // Guardar el creador via jwt, guarda el id del creador
        proyecto.creador = req.usuario.id

        // guardar el proyecto
        proyecto.save();
        res.json(proyecto)

    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}

// Obtiene todos los proyectos del usuario actual 

exports.obtenerProyectos = async (req, res) => { 
    try {
      const proyectos = await Proyecto.find({ creador: req.usuario.id}).sort({ creado: -1 })
      res.json({proyectos})
    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}

// Actualiza un proyecto 
exports.actualizarProyecto = async(req, res) =>{
    // Revisar si hay errores
   const errors = validationResult(req)
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
   }
// extraer info del proyecto
const { nombre } = req.body
const nuevoProyecto = {};

if(nombre){
    nuevoProyecto.nombre = nombre;
}
try{
    // revisar id
    let proyecto = await Proyecto.findById(req.params.id);
    // si el proyecto existe 
    if(!proyecto){
        return res.status(404).json({msg: 'Proyecto not found'})
    }
        //verificar creador
    if(proyecto.creador.toString() !== req.usuario.id){
        return res.status(401).json({msg: 'No authorization'})
    }
        // actualizar
        proyecto = await Proyecto.findOneAndUpdate({_id: req.params.id}, {$set: nuevoProyecto}, { new: true });
        res.json({proyecto});
    }catch(err){
        console.error(err)
        res.status(500).send('Error en el servidor')
    }
}

// Eliminar proyecto
exports.eliminarProyecto = async(res, req) => {
    try {
    // revisar id
    let proyecto = await Proyecto.findById(req.params.id);
    // si el proyecto existe 
    if(!proyecto){
        return res.status(404).json({msg: 'Proyect not found'})
    }
    //verificar creador
    if(proyecto.creador.toString() !== req.usuario.id){
        return res.status(401).json({msg: 'No authorization'})
    }
    // eliminar proyecto
    await Proyecto.findOneAndRemove({_id: req.params.id});
    res.json({msg: 'Proyect deleted'})
    } catch (error) {
       console.log(error) 
       res.status(500).send('Error en el servidor')
    }
}