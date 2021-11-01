import React, {useReducer} from 'react';
import ProyectoContext from './proyectoContext'
import clienteAxios from '../../config/axios'
import proyectoReducer from './proyectoReducer'
import {FORMULARIO_PROYECTO,
        OBTENER_PROYECTO,
        AGREGAR_PROYECTO,
        PROYECTO_ERROR,
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO
        }from '../../types'

const ProyectoState = props => {


    const initialState = {
         proyectos : [],
        // form del aside
        formulario: false,
        errorform: false,
        proyecto: null,
        mensaje: null
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
    const obtenerProyectos = async () => {
      try {
          const resultado = await clienteAxios.get('/api/proyectos')
        dispatch({
            type: OBTENER_PROYECTO, 
            payload: resultado.data.proyectos
        })
      } catch (error) {
        const alerta = {
            msg: 'Hubo un error',
            categoria: 'alerta-error'
        }
     dispatch({
         type: PROYECTO_ERROR,
         payload: alerta
     })
    }
    }
    // Agregar proyecto
    const agregarProyecto = async proyecto => {
       try {
           const resultado = await clienteAxios.post('/api/proyectos', proyecto)
        dispatch({
            type: AGREGAR_PROYECTO, 
            payload: resultado.data
        })
       } catch (error) {
        const alerta = {
            msg: 'Hubo un error',
            categoria: 'alerta-error'
        }
     dispatch({
         type: PROYECTO_ERROR,
         payload: alerta
     })
    }
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
    const eliminarProyecto = async proyectoId => {
       try {
           await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
       } catch (error) {
           const alerta = {
               msg: 'Hubo un error',
               categoria: 'alerta-error'
           }
        dispatch({
            type: PROYECTO_ERROR,
            payload: alerta
        })
       }
    }

    return(
        <ProyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorform: state.errorform,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
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