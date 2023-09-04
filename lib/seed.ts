import { sql } from '@vercel/postgres'

export async function seed() {
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS players (
      id SERIAL PRIMARY KEY,
      name VARCHAR (255) UNIQUE NOT NULL,
      is_active BOOLEAN NOT NULL,
      is_guest BOOLEAN NOT NULL,
      phone VARCHAR (255) UNIQUE NOT NULL,
      email VARCHAR (255) UNIQUE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    `

  console.log(`Created "players" table`)

  const players = await Promise.all([
    sql`
          INSERT INTO players (name, is_active, is_guest, email, phone)
          VALUES ('Elnur M', true, false, 'elnoormobile@gmail.com', '123123123')
      `,

  ])

  console.log(`Seeded ${players.length} users`)

  return {
    createTable,
    players,
  }
}