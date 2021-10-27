import React, { useReducer } from 'react';
import AuthReducer from './authReducer';
import AuthContext from './authContext';
import {REGISTRO_EXITOSO, 
    REGISTRO_ERROR, 
    OBTENER_USUARIO, 
    LOGIN_EXITOSO, 
    LOGIN_ERROR, 
    CERRAR_SESION}from '../../types'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticate: null,
        usuario: null,
        mensaje: null
    }

    const [ state, dispatch ] = useReducer(AuthContext, initialState)
    const registroExitoso = ()=>{
        dispatch({
            type: REGISTRO_EXITOSO,
            payload: {}
        });
    
    }
    return(
        <AuthContext.Provider
        value={{
            
        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState