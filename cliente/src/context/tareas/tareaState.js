import React, {useReducer} from 'react'
import TareaContext from './tareaContext'
import clienteAxios from '../../config/axios'
import TareaReducer from './tareaReducer'
import {TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        LIMPIAR_TAREA
    } 
from '../../types'

const TareaState = props => {
    const initialState = {
        tareasproyecto: [], 
        errortarea: false,
        tareaseleccionada: null
    }

    // crear dispatch  y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);
    // FUNCIONES

    // Obtener tareas
    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }})
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error)
        }
    
    }

    const agregarTarea = async tarea => {
       try {
          await clienteAxios.post('/api/tareas', tarea)
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
       } catch (error) {
           console.log(error)
       }
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA,
        })
    }

    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: {proyecto} } )
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
       
    }

    const actualizarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const limpiarTareaSelecionada = tarea => {
        dispatch({
            type: LIMPIAR_TAREA,
            payload: tarea
        })
    }

    return(
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTareaSelecionada
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState

