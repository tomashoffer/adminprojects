import React, { useContext } from 'react'
import ProyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const Proyecto = ({proyecto}) => {
    // Obtener el state de proyectos
    const proyectosContext = useContext(ProyectoContext);
    const { proyectoActual } = proyectosContext;

    // obtener la funciones de tareas context
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;


    const seleccionarProyecto = id => {
        proyectoActual(id); // fijar proyecto actual
        obtenerTareas(id); // filtrar tareas por proyecto
    }

    return ( 
        <li>
            <button
            type='button'
            className='btn btn-blank'
            onClick={() => seleccionarProyecto(proyecto._id) }
            >
               {proyecto.nombre}     
            </button>
        </li>
     );
}
 
export default Proyecto;