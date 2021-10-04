import React, { Fragment, useContext } from 'react'
import Tarea from './Tarea'
import ProyectoContext from '../../context/proyectos/proyectoContext';

const ListadoTarea = () => {
    // Obtener el state de proyectos
    const proyectosContext = useContext(ProyectoContext);
    const { proyecto } = proyectosContext;
    // Si no hay proyectio actual
    if(!proyecto) return <h2>Selecciona un proyecto</h2>;
    // Array destructuring para extraer proyrxcto actual
    const [proyectoActual] = proyecto;

    const tareasProyecto = [
        {nombre: 'Elegir Plataforma', estado: true},
        {nombre: 'Elegir Colores', estado: false},
        {nombre: 'Elegir Plataforma de Pagos', estado: false},
        {nombre: 'Elegir Hosting', estado: true}
    ]

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            
            <ul className="listado-tareas">
                {tareasProyecto.length === 0
                ? (<li className="tarea"><p>No hay tareas</p></li>)
                : tareasProyecto.map(tarea=>(
                    <Tarea
                    tarea={tarea}
                    />
                ))
                }
            </ul>
            <button 
             type='button'
             className="btn btn-primario">
                Eliminar Proyecto &times;
            </button>
        </Fragment>
     );
}
 
export default ListadoTarea;