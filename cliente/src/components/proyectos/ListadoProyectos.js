import React, {useContext, useEffect} from 'react'
import Proyecto from './Proyecto'
import ProyectoContext from '../../context/proyectos/proyectoContext'

const ListadoProyecto = () => {
    // Extraer proyecyos de state inicial
    const proyectosContext = useContext(ProyectoContext);
    const { proyectos, obtenerProyectos } = proyectosContext;
    
    // Obtener Proyectos cuando carga el componente
    useEffect(() => {
       obtenerProyectos()
    }, [])

    // revisar si proyectos tiene contenido
    if(proyectos.lenght === 0) return null;


    return ( 
        <ul className="listado-proyectos">
        {proyectos.map(proyecto => (
            <Proyecto
            key={proyecto.id}
            proyecto={proyecto}
            />      
        ))}
        </ul>
     );
}
 
export default ListadoProyecto;