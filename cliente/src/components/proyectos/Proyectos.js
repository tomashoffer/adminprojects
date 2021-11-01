import React, { useContext, useEffect } from 'react'
import Sidebar from '../layout/Sidebar'
import Barra from '../layout/Barra'
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'
import AuthContext from '../../context/authentication/authContext'

const Proyectos = () => {

    // Extraer info de authentication
    const authContext = useContext(AuthContext)
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        // mantenemos la data del usuario al hacer refresh
        usuarioAutenticado()
        // eslint-disable-next-line
    }, [])

    return ( 
    <div className="contenedor-app">

        <aside>
            <Sidebar/>
        </aside>

        <div className="seccion-principal">
            <Barra/>

            <main>
                <FormTarea/>

                <div className="contenedor-tareas">
                    <ListadoTareas/>
                </div>

            </main>
            
        </div>
    </div>
    );
}
 
export default Proyectos;