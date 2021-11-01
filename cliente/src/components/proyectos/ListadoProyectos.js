import React, {useContext, useEffect} from 'react'
import Proyecto from './Proyecto'
import ProyectoContext from '../../context/proyectos/proyectoContext'
import AlertasContext from '../../context/alertas/alertasContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListadoProyecto = () => {
    // Extraer proyectos de state inicial
    const proyectosContext = useContext(ProyectoContext);
    const { proyectos, mensaje, obtenerProyectos } = proyectosContext;
    
    const alertaContext = useContext(AlertasContext);
    const { alerta, mostrarAlerta } = alertaContext;
    
    // Obtener Proyectos cuando carga el componente
    useEffect(() => {
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
       obtenerProyectos()
        // eslint-disable-next-line
    }, [mensaje, mostrarAlerta])

    // revisar si proyectos tiene contenido
    if(proyectos.lenght === 0) return <p>No hay proyectos, comienza creando uno</p>;


    return ( 
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}></div>) : null}
            <TransitionGroup>
        {proyectos.map(proyecto => (
            <CSSTransition
            // _id: mongo utiliza el id con guion bajo
            key={proyecto._id}
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