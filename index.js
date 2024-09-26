// Importación de la dependencia
import express from 'express'
// Importación del puerto en donde levantar el servidor
import { PORT } from './config.js'

// Creación de la aplicación
const app = express()

// Creaciónd e endpoints (GET, POST, DELETE)
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Endopoint - POST
app.post('/login', (req, res) => {})
app.post('/registrar', (req, res) => {})
app.post('/logout', (req, res) => {})

// Ruta protegida - GET
app.get('/protected', (req, res) => {})

// Levatar proyecto
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
