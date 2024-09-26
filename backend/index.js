// Importación de las dependencias necesarias
import express from 'express'
import cors from 'cors'
import { pool } from './conectionbd.js'
import { PORT } from './config.js' // Asegúrate de que este archivo tenga la configuración correcta del puerto

// Creación de la aplicación
const app = express()

// Middleware para permitir solicitudes desde el frontend y para leer JSON en el cuerpo de la solicitud
app.use(cors())
app.use(express.json()) // Asegúrate de que el servidor pueda manejar JSON

// Función para validar el username
const isValidUsername = (username) => {
  return username && username.length > 3 // El username debe tener más de 3 caracteres
}

// Función para validar el email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Verifica que tenga un formato de email con "@" y "."
  return emailRegex.test(email)
}

// Función para validar el password
const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{10,})/ // Debe tener al menos una mayúscula, un carácter especial y más de 9 caracteres
  return passwordRegex.test(password)
}

// Endpoint para agregar un nuevo usuario
app.post('/registrar', async (req, res) => {
  const { username, email, password } = req.body

  try {
    // Validar username
    if (!isValidUsername(username)) {
      return res.status(400).json({ error: 'El nombre de usuario debe tener más de 3 caracteres.' })
    }

    // Validar email
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'El email no tiene un formato válido.' })
    }

    // Validar password
    if (!isValidPassword(password)) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos una mayúscula, un carácter especial y más de 9 caracteres.' })
    }

    // Si pasa todas las validaciones, inserta el usuario
    const createAt = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'America/Bogota' }) // Hora actual
    const result = await pool.query(
      'INSERT INTO public.users (username, email, password, create_at) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, password, createAt]
    )

    // Responder con el usuario creado
    res.status(201).json(result.rows[0])
    console.log('Usuario agregado con éxito')
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Error al registrar usuario.' })
  }
})

// Otros endpoints (GET, UPDATE, DELETE) podrían ir aquí

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
