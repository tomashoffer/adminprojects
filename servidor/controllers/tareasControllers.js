const Tarea = require('../models/TareasModel')
const Proyecto = require('../models/ProyectoModel')
const { validationResult } = require('express-validator')
 


exports.crearTarea = async (req, res) =>{
    // Revisar si hay errores
   const errors = validationResult(req)
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
   }

   try {
    // extraer proyecto y si existe
    const {proyecto} = req.body;
    const existeProyecto = await Proyecto.findById(proyecto)
    if(!existeProyecto){
        res.status(404).json({msg: "Proyect no found!"})
    }
    // revisar si el proyecto actual pertenece al usuario auth
    if(existeProyecto.creador.toString() !== req.usuario.id){
        return res.status(401).json({msg: 'No authorization'})
    }       
    // crear tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({tarea})
   } catch (error) {
       console.log(error)
       res.status(500).send({msg:'Hubo un error'})
   }
}

exports.obtenerTareas = async (req, res) => {
  // Revisar si hay errores
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
  }

  try {
   // extraer proyecto y si existe, query es por que lo pasamos como params
   const {proyecto} = req.query;
   const existeProyecto = await Proyecto.findById(proyecto)
   if(!existeProyecto){
       res.status(404).json({msg: "Proyect no found!"})
   }
   // revisar si el proyecto actual pertenece al usuario auth
   if(existeProyecto.creador.toString() !== req.usuario.id){
       return res.status(401).json({msg: 'No authorization'})
   }       
  // obtener tareas por proyecto
  const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 })
  res.json({tareas})
  } catch (error) {
      console.log(error)
      res.status(500).send({msg:'Hubo un error'})
  }    
}


exports.actualizarTareas = async (req, res) => {
  // Revisar si hay errores
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()})
  }

  try {
   // extraer proyecto y si existe
   const {proyecto, nombre, estado} = req.body;
   const existeProyecto = await Proyecto.findById(proyecto)
  // si tarea existe
  let tarea = await Tarea.findById(req.params.id)
  if(!tarea){
      return res.status(404).json({msg:"No existe la tarea"})
  }
   // revisar si el proyecto actual pertenece al usuario auth
   if(existeProyecto.creador.toString() !== req.usuario.id){
       return res.status(401).json({msg: 'No authorization'})
   }
   // crear obj con nueva info
   const nuevaTarea = {};
   nuevaTarea.nombre = nombre;
   nuevaTarea.estado = estado;    
  // guardar tarea actualizada
   tarea = await Tarea.findOneAndUpdate({_id: req.params.id }, nuevaTarea, {new: true}); 
   res.json({tarea})

  } catch (error) {
      console.log(error)
      res.status(500).send({msg:'Hubo un error'})
  }    
}

exports.eliminarTareas = async (req, res) => {
    // Revisar si hay errores
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
  
    try {
     // extraer proyecto y si existe
     const {proyecto} = req.query;
     const existeProyecto = await Proyecto.findById(proyecto)
    // si tarea existe
    let tarea = await Tarea.findById(req.params.id)
    if(!tarea){
        return res.status(404).json({msg:"No existe la tarea"})
    }
     // revisar si el proyecto actual pertenece al usuario auth
   if(existeProyecto.creador.toString() !== req.usuario.id){
    return res.status(401).json({msg: 'No authorization'})
    }
     // eliminar tarea 
     await Tarea.findOneAndRemove({_id: req.params.id})
     res.json({msg:"task deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:'Hubo un error'})
    }    
  }