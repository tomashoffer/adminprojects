const express = require('express')
const conectarDB = require('./config/db')
//crear servidor 
const app = express();
// conectar la db
conectarDB()

// habilitar expres.json
app.use(express.json({ extended: true }))
// puerto de la app
const PORT = process.env.PORT || 4000;

// Importar Rutas
app.use('/api/usuarios', require('./routes/usuariosRoutes'))
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/proyectos', require('./routes/proyectoRoutes'))

// DEFINIR PAGINA PRINCIPAL
app.get('/', (req, res) => {
    res.send('Hola Mundo')
}) 
  
app.listen(PORT, ()=>{console.log(`Server running in port ${PORT}`);});