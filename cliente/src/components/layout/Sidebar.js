import React from 'react'
import NuevosProyecto from '../proyectos/NuevosProyecto'
import ListadoProyectos from '../proyectos/ListadoProyectos'

const Sidebar = () => {
    return ( 
        <aside>
            <h1>MERN <span>Task</span></h1>

            <NuevosProyecto/>

            <div className="proyectos">

                <h2>Tus Proyectos</h2>

                <ListadoProyectos/>
                
            </div>
        </aside>
     );
}
 
export default Sidebar;