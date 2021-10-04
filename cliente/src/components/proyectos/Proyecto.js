import React, { useContext } from 'react'
import ProyectoContext from '../../context/proyectos/proyectoContext';


const Proyecto = ({proyecto}) => {
    // Obtener el state de proyectos
    const proyectosContext = useContext(ProyectoContext);
    const { poryectoActual } = proyectosContext;

    return ( 
        <li>
            <button
            type='button'
            className='btn btn-blank'
            onClick={() => poryectoActual(proyecto.id) }
            >
               {proyecto.nombre}     
            </button>
        </li>
     );
}
 
export default Proyecto;