import React, { Fragment, useState, useContext } from 'react'
import ProyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(ProyectoContext);
    const {formulario, errorform, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    // State para proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre:''
    })
    
    // Extraer nombre del proyecto
    const { nombre } = proyecto;


    // lee contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitProyecto = e => {
        e.preventDefault();
        // validar proyecto
        if(nombre === '') {
            mostrarError();
            return;
        }
        // agregar al state
        agregarProyecto(proyecto)
        // reiniciar el form
        guardarProyecto({
            nombre: ''
        })

    }

    return ( 
        <Fragment>
            <button
            type='button'
            className='btn btn-block btn-primario'
            onClick={() => mostrarFormulario()}
            >
                Nuevo Proyecto
            </button>
           
            {
                formulario
                ? (
                    <form className='formulario-nuevo-proyecto'
                    onSubmit={onSubmitProyecto}>
                        <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre del Proyecto"
                        name='nombre'
                        value={nombre}
                        onChange={onChangeProyecto}
                        />
                        <input 
                        type="submit"
                        className="btn btn-block btn-primario"
                        value='Agregar Proyecto' />
                    </form>
                )
                : null  
            }

            {errorform ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}

    </Fragment>
    );
}
 
export default NuevoProyecto;

