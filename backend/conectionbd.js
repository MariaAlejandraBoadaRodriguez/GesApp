import pg from 'pg' // Importa el paquete pg
const { Pool } = pg // Extrae Pool del paquete

export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'GesApp',
  user: 'postgres',
  password: '12345'
})
