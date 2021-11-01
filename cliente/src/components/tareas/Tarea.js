import React, {useContext} from 'react'
import tareaContext from '../../context/tareas/tareaContext';
import ProyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({tarea}) => {
            // id proyecto actual        
            const proyectosContext = useContext(ProyectoContext);
            const { proyecto } = proyectosContext;

            // obtener la funciones de tareas context
            const tareasContext = useContext(tareaContext);
            const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

            // extraer proyecto
            const [proyectoActual] = proyecto;

            // funcion para el boton de eliminarTarea
            const tareaEliminar = id =>{
                eliminarTarea(id, proyectoActual._id)
                obtenerTareas(proyectoActual.id)
            }
            // funcion que modifica estado de tareas 
            const cambiarEstado = () =>{
                if(tarea.estado){
                    tarea.estado = false;
                }else{
                    tarea.estado = true;
                }
                actualizarTarea(tarea)
            }
            // Agrega una tarea actual cuando se selecciona
            const selecccionarTarea = tarea => {
                guardarTareaActual(tarea)
            }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado 
                ? (
                    <button
                        type='button'
                        className="completo"
                        onClick={()=>cambiarEstado(tarea)}
                    >Completo
                   </button>
                )
                : (
                    <button
                        type='button'
                        className="incompleto"
                        onClick={()=>cambiarEstado(tarea)}
                    >Incompleto
                   </button>
                )
                 }
            </div>
            <div className="acciones">
                <button
                type='button'
                className="btn btn-primario"
                onClick={()=>selecccionarTarea(tarea)}
                >
                    Editar
                </button>
                <button
                type='button'
                className="btn btn-secundario"
                onClick={()=>tareaEliminar(tarea._id)}
                >
                    Eliminar
                </button>
            </div>
        </li>
     );
}
 
export default Tarea;