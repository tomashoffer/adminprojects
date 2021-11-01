import React, {useContext, useState, useEffect} from 'react'
import ProyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
        // Obtener si un proyecto esta activo
        const proyectosContext = useContext(ProyectoContext);
        const { proyecto } = proyectosContext;
        
        // obtener la funciones de tareas context
        const tareasContext = useContext(tareaContext);
        const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTareaSelecionada } = tareasContext;

        // Effect que detecta si hay una tarea seleccionada para editar
        useEffect(()=>{
            if(tareaseleccionada !== null){
                guardarTarea(tareaseleccionada)
            } else{
                guardarTarea({
                    nombre:'',
                })
            }
        }, [tareaseleccionada])

        // state del formulario 
        const [tarea, guardarTarea] = useState({
            nombre:'',
        })
        // extraer el nombre del proyecto
        const { nombre } = tarea;

        if(!proyecto) return null;  
        // Array destructuring para extraer proyecto actual
        const [proyectoActual] = proyecto;

        // Leer los valores del formulario
        const handleChange = e =>{
            guardarTarea({
                ...tarea,
                [e.target.name] : e.target.value,
            })
        }

        const onSubmit = e => {
            e.preventDefault();

            // validar Formulario
            if(nombre.trim() === '') {
                validarTarea(); // si esta vacio pasa a true
                return;
            }
            // Es edit o nueva tarea?
            if(tareaseleccionada === null){
                // agregar tarea al state
                tarea.proyecto = proyectoActual._id;
                agregarTarea(tarea)
            }else {
                // actualizar tarea seleccionada
                actualizarTarea(tarea)
                // elimina tarea seleccionada del state
                limpiarTareaSelecionada()
            }
            // pasar la validacion
            
            // obtener tareas y filtrar las del proyecto actual
            obtenerTareas(proyectoActual.id)

            // reiniciar form
            guardarTarea({
                nombre:'',
            })
        }
    
    return ( 
    <div className="formulario">
        <form
        onSubmit={onSubmit}
        >
            <div className="contenedor-input">
                <input 
                type="text"
                 className="input-text"
                 placeholder='Nombre Tarea...'
                 name='nombre'
                 value={nombre}
                 onChange={handleChange}
                 />
            </div>
            <div className="contenedor-input">
                <input 
                type="submit"
                 className="btn btn-primario btn-submit btn-block"
                 value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'} 
                 />
            </div>
        </form>
        {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatiorio</p> : null}
    </div>
     );
}
 
export default FormTarea;