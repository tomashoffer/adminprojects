import React, {useContext, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/authentication/authContext';

const RutaPrivada = ({ Component, ...props }) => {
      // Extraer info de authentication
  const authContext = useContext(AuthContext);
  const { authenticate, cargando, usuarioAutenticado } = authContext;

  useEffect(() => {
    // mantenemos la data del usuario al hacer refresh
    usuarioAutenticado();
    // eslint-disable-next-line
  }, [usuarioAutenticado]);

    return ( 
        <Route { ...props } render={ props => !authenticate && !cargando
            ? (<Redirect to='/' />) 
            : (<Component {...props} />)}
        
        />
     );
}
 
export default RutaPrivada;
