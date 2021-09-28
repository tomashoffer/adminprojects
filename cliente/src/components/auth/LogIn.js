import React, {useState} from 'react'
import { Link } from 'react-router-dom'


const LogIn = () => {

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
    }

    return ( 
    <div className="form-usuario">
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