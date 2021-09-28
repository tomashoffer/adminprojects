import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LogIn from './components/auth/LogIn' 
import NuevaCuenta from './components/auth/NuevaCuenta' 
import Proyectos from './components/proyectos/Proyectos' 

function App() {
  return (
  <Router>
    <Switch>
      <Route exact path='/' component={LogIn} />
      <Route exact path='/nueva-cuenta' component={NuevaCuenta} />
      <Route exact path='/proyectos' component={Proyectos} />
    </Switch>
  </Router>
  );
}

export default App;
