import React, {useReducer} from 'react'
import ProyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'
import {FORMULARIO_PROYECTO,
        OBTENER_PROYECTO,
        AGREGAR_PROYECTO
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
        formulario: false
    }

    // Dispach para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = () => {
        dispatch({
            type: OBTENER_PROYECTO, 
            payload: proyectos
        })
    }

    return(
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                mostrarFormulario,
                obtenerProyectos
            }}
        >
                {props.children}
        </ProyectoContext.Provider>
    )
}

export default ProyectoState;