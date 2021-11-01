import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import AlertasContext from '../../context/alertas/alertasContext'
import AuthContext from '../../context/authentication/authContext'


const LogIn = (props) => {
  // extraer valores de context
  const alertaContext = useContext(AlertasContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, authenticate, iniciarSesion } = authContext;

      // En caso de que el password o usuario no exista
      useEffect(() => {
        if(authenticate){
            props.history.push('/proyectos')
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
         // eslint-disable-next-line
    }, [mensaje, authenticate, props.history])

    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    })

    const {email, password} = usuario;

    const OnChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        // validar que no haya campos vacios
        if(email.trim() === '' ||
         password.trim() === ''){
             mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
             return;
         }
         // pasar al action
         iniciarSesion({email, password})
      
    }

    return ( 
    <div className="form-usuario">
         { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
        <div className="contenedor-form sombra-dark">
            <h1>Iniciar Sesión</h1>
            <form
            onSubmit={onSubmit}>
                <div className="campo-form">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email"
                    id='email'
                    name='email'
                    placeholder="Email"
                    value={email}
                    onChange={OnChange}
                     />
                </div>
                <div className="campo-form">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password"
                    id='password'
                    name='password'
                    placeholder="Password"
                    value={password}
                    onChange={OnChange}
                     />
                </div>
                <div className="campo-form">
                    <input 
                    type="submit"
                    className="btn btn-primario btn-block"
                    value='Iniciar Sesión'
                    />
                </div>
            </form>
            <Link to={'nueva-cuenta'} className="enlace-cuenta">
                Obtener Cuenta
            </Link>
        </div>
    </div> 
    );
}
 
export default LogIn;