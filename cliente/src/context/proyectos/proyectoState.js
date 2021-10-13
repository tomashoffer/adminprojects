import React, {useReducer} from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import {FORMULARIO_PROYECTO,
        OBTENER_PROYECTO,
        AGREGAR_PROYECTO,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO
        }from '../../types'

const ProyectoState = props => {

    const proyectos = [
        {id: 1, nombre: 'tienda1'},
        {id: 2, nombre: 'tienda2'},
        {id: 3, nombre: 'tienda3'}
    ]
    
    const initialState = {
         proyectos : [],
        // form del aside
        formulario: false,
        errorform: false,
        proyecto: null
    }

    // Dispach para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }
    // Obtener todos los proyectos
    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTO, 
            payload: proyectos
        })
    }
    // Agregar proyecto
    const agregarProyecto = proyecto => {
        proyecto.id =  uuidv4();
        // Insertar proyecto en state
        dispatch({
            type: AGREGAR_PROYECTO, 
            payload: proyecto
        })
    }

    // validar formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // Selecciona proyecto actual
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }
    // Eliminar proyecto actual
    const eliminarProyecto = proyectoId => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
    }

    return(
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorform: state.errorform,
                proyecto: state.proyecto,
                mostrarFormulario,
                obtenerProyectos, 
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
                {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;