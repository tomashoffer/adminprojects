import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LogIn from './components/auth/LogIn' 
import NuevaCuenta from './components/auth/NuevaCuenta' 
import Proyectos from './components/proyectos/Proyectos' 
import ProyectoState from './context/proyectos/proyectoState'
import TareaState from './context/tareas/tareaState'
import AlertaState from './context/alertas/alertaState'
import AuthState from './context/authentication/authState'

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
          <Router>
              <Switch>
                <Route exact path='/' component={LogIn} />
                <Route exact path='/nueva-cuenta' component={NuevaCuenta} />
                <Route exact path='/proyectos' component={Proyectos} />
              </Switch>
          </Router>
          </AuthState>
          </AlertaState>
      </TareaState>
  </ProyectoState>
  );
}

export default App;
