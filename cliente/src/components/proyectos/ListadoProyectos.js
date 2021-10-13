import React, {useContext, useEffect} from 'react'
import Proyecto from './Proyecto'
import ProyectoContext from '../../context/proyectos/proyectoContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoProyecto = () => {
    // Extraer proyectos de state inicial
    const proyectosContext = useContext(ProyectoContext);
    const { proyectos, obtenerProyectos } = proyectosContext;
    
    // Obtener Proyectos cuando carga el componente
    useEffect(() => {
       obtenerProyectos()
       // eslint-disable-next-line
    }, [])

    // revisar si proyectos tiene contenido
    if(proyectos.lenght === 0) return <p>No hay proyectos, comienza creando uno</p>;


    return ( 
        <ul className="listado-proyectos">
            <TransitionGroup>
        {proyectos.map(proyecto => (
            <CSSTransition
            key={proyecto.id}
            timeout={200}
            classNames='proyecto'
            >
                 <Proyecto
                    proyecto={proyecto}
                    />  
            </CSSTransition>               
        ))}
        </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyecto;