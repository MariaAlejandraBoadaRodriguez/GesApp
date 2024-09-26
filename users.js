import { pool } from './conectionbd.js'

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

// Función para agregar un nuevo usuario
const addUser = async (username, email, password) => {
  try {
    // Validar username
    if (!isValidUsername(username)) {
      throw new Error('El nombre de usuario debe tener más de 3 caracteres.')
    }

    // Validar email
    if (!isValidEmail(email)) {
      throw new Error('El email no tiene un formato válido.')
    }

    // Validar password
    if (!isValidPassword(password)) {
      throw new Error('La contraseña debe tener al menos una mayúscula, un carácter especial y más de 9 caracteres.')
    }

    // Si pasa todas las validaciones, inserta el usuario
    const createAt = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'America/Bogota' }) // Hora actual
    const result = await pool.query(
      'INSERT INTO public.users (username, email, password, create_at) VALUES ($1, $2, $3, $4)',
      [username, email, password, createAt]
    )

    console.log('Usuario agregado con éxito')
    console.table(result.rows)
  } catch (error) {
    console.error(error.message)
  }
}

// Función para obtener todos los usuarios
const getUsers = async () => {
  try {
    const result = await pool.query('SELECT id_user, username, email, password, create_at FROM public.users')
    console.table(result.rows)
  } catch (error) {
    console.error(error.message)
  }
}

// Función para actualizar un usuario por su ID
const updateUser = async (iduser, newUsername, newEmail, newPassword) => {
  try {
    // Validar username
    if (!isValidUsername(newUsername)) {
      throw new Error('El nombre de usuario debe tener más de 3 caracteres.')
    }

    // Validar email
    if (!isValidEmail(newEmail)) {
      throw new Error('El email no tiene un formato válido.')
    }

    // Validar password
    if (!isValidPassword(newPassword)) {
      throw new Error('La contraseña debe tener al menos una mayúscula, un carácter especial y más de 9 caracteres.')
    }

    // Si pasa todas las validaciones, actualiza el usuario
    const result = await pool.query(
      'UPDATE public.users SET username = $1, email = $2, password = $3 WHERE id_user = $4',
      [newUsername, newEmail, newPassword, iduser]
    )

    if (result.rowCount === 0) {
      console.log('No se encontró ningún usuario con el ID proporcionado.')
    } else {
      console.log('Usuario actualizado con éxito')
    }
  } catch (error) {
    console.error(error.message)
  }
}

// Función para eliminar un usuario por su ID
const deleteUser = async (iduser) => {
  try {
    const result = await pool.query('DELETE FROM public.users WHERE id_user = $1', [iduser])
    if (result.rowCount === 0) {
      console.log('No se encontró ningún usuario con el ID proporcionado.')
    } else {
      console.log('Usuario eliminado con éxito')
    }
  } catch (error) {
    console.error(error.message)
  }
}

// Llamar a las funciones con datos de ejemplo

// Obtener usuarios
getUsers()

// Agregar un usuario
addUser()

// Actualizar un usuario (ejemplo: actualizar usuario con id_user = 1)
updateUser()

// Eliminar un usuario (ejemplo: eliminar usuario con id_user = 2)
deleteUser(5)
