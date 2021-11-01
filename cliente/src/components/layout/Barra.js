import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/authentication/authContext";

const Barra = () => {
  // Extraer info de authentication
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
    // mantenemos la data del usuario al hacer refresh
    usuarioAutenticado();
    // eslint-disable-next-line
  }, [usuarioAutenticado]);

  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola <span>{usuario.nombre}</span>
        </p>
      ) : null}
      <nav className="nav-principal">
        <button 
        className="btn btn-blank cerrar-sesion"
        style={{color: 'white'}}
        onClick={() => cerrarSesion()}
        >
            Cerrar Sesion
            </button>
      </nav>
    </header>
  );
};

export default Barra;
