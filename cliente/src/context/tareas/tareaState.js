import React, {useReducer} from 'react'
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'
import { v4 as uuidv4 } from 'uuid';
import {TAREAS_PROYECTO,
        AGREGAR_TAREA,
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        ESTADO_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        LIMPIAR_TAREA
    } 
from '../../types'

const TareaState = props => {
    const initialState = {
        tareas: [
            {id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
            {id: 3, nombre: 'Elegir Plataforma de Pagos', estado: false, proyectoId: 3},
            {id: 4, nombre: 'Elegir Hosting', estado: true, proyectoId: 4},
            {id: 5, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {id: 6, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
            {id: 7, nombre: 'Elegir Plataforma de Pagos', estado: false, proyectoId: 3},
            {id: 8, nombre: 'Elegir Hosting', estado: true, proyectoId: 4},
            {id: 9, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {id: 10, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
            {id: 11, nombre: 'Elegir Plataforma de Pagos', estado: false, proyectoId: 3},
            {id: 12, nombre: 'Elegir Hosting', estado: true, proyectoId: 4}
        ],
        tareasproyecto: null, 
        errortarea: false,
        tareaseleccionada: null
    }

    // crear dispatch  y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);
    // FUNCIONES

    // Obtener tareas
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }
    const agregarTarea = tarea => {
        tarea.id =  uuidv4();
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA,
        })
    }
    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }
    const estadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }
    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
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
                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                estadoTarea,
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

