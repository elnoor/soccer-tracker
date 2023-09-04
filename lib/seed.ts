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
          VALUES 
          ('Elnur', true, false, 'elnoormobile@gmail.com', '11111'),
          ('Elnar', true, false, 'elnoormobile+1@gmail.com', '22222'),
          ('Kamran', true, false, 'elnoormobile+2@gmail.com', '3333333'),
          ('Tural Q', true, false, 'elnoormobile+3@gmail.com', '4444444'),
          ('Tural M', true, false, 'elnoormobile+4@gmail.com', '5555555'),
          ('Riyad', true, false, 'elnoormobile+5@gmail.com', '6666666')
      `,

  ])

  console.log(`Seeded ${players.length} users`)

  return {
    createTable,
    players,
  }
}