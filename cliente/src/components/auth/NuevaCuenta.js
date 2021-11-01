import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import AlertasContext from '../../context/alertas/alertasContext'
import AuthContext from '../../context/authentication/authContext'


const NuevaCuenta = (props) => {
    // extraer valores de context
    const alertaContext = useContext(AlertasContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, authenticate, registrarUsuario } = authContext;

    // En caso de que el usuario este auth o ya exista
    useEffect(() => {
        if(authenticate){
            props.history.push('/proyectos')
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
         // eslint-disable-next-line
    }, [mensaje, authenticate, props.history, mostrarAlerta])

    const [cuenta, guardarCuenta] = useState({
        nombre:'',
        email: '',
        password: '',
        confirmar:''
    })

    const {nombre, email, password, confirmar} = cuenta;

    const OnChange = e => {
        guardarCuenta({
            ...cuenta,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        // validar que no haya campos vacios
        if(nombre.trim() === '' ||
         email.trim() === ''||
         password.trim() === '' ||
         confirmar.trim() === ''){
             mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
             return;
         }
        // password min 6 characters
        if(password.length < 6){
            mostrarAlerta('El password debe ser minimo de 6 caracteres', 'alerta-error');
            return;
        }
        // 2 passwords iguales 
        if(password !== confirmar){
            mostrarAlerta('Los Password no son iguales', 'alerta-error');
            return;
        }
        // pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    return ( 
    <div className="form-usuario">
        { alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
        <div className="contenedor-form sombra-dark">
            <h1>Crea tu Cuenta</h1>
            <form
            onSubmit={onSubmit}>
                <div className="campo-form">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                    type="text"
                    id='nombre'
                    name='nombre'
                    placeholder="Nombre"
                    value={nombre}
                    onChange={OnChange}
                     />
                </div>
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
                    <label htmlFor="confirmar">Repite tu Password</label>
                    <input 
                    type="password"
                    id='confirmar'
                    name='confirmar'
                    placeholder="Confirmar Password"
                    value={confirmar}
                    onChange={OnChange}
                     />
                </div>
                <div className="campo-form">
                    <input 
                    type="submit"
                    className="btn btn-primario btn-block"
                    value='Registrarme'
                    />
                </div>
            </form>
            <Link to={'/'} className="enlace-cuenta">
                Volver a Iniciar Sesión
            </Link>
        </div>
    </div> 
    );
}
 
export default NuevaCuenta;