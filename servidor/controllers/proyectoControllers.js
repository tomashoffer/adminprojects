const Proyecto = require('../models/ProyectoModel')

exports.crearProyecto = async (req, res) => { 
    try {
        // crear nuevo proyectos
        const proyecto = await new Proyecto(req.body);

        // Guardar el creador via jwt
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
      console.log(req.usuario)

    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}