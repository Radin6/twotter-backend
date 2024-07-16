import { createPool } from "mysql2/promise";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config.js";

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE,
})

export async function initializeDB() {
  try {
    await pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    await pool.query(`USE ${process.env.DB_DATABASE}`)
    await pool.query(`
        CREATE TABLE IF NOT EXISTS  \`users\`  (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL
        )
      `)
    console.log(`DB created: ${process.env.DB_DATABASE}`)
  } catch (error) {
    console.log("error initializing: ", error)
  }
}