import { sql } from '@vercel/postgres'

export async function seed() {
  const createPlayersTable = await sql`
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

  const playersInserted = await Promise.all([
    sql`
          INSERT INTO players (name, is_active, is_guest, email, phone)
          VALUES 
          ('Elnur', true, false, 'elnoormobile@gmail.com', '11111'),
          ('Elnar', true, false, 'elnoormobile+1@gmail.com', '22222'),
          ('Kamran', true, true, 'elnoormobile+2@gmail.com', '3333333'),
          ('Tural Q', false, false, 'elnoormobile+3@gmail.com', '4444444'),
          ('Tural M', true, true, 'elnoormobile+4@gmail.com', '5555555'),
          ('Riyad', false, true, 'elnoormobile+5@gmail.com', '6666666')
      `,
  ])
  console.log(`Seeded ${playersInserted.length} users`)
  
  const createTransactionsTable = await sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      player_id INT NOT NULL,
      amount DECIMAL NOT NULL DEFAULT 0,
      note VARCHAR (1000),
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    `
  console.log(`Created "transactions" table`)

  const transactionsInserted = await Promise.all([
    sql`
          INSERT INTO transactions (player_id, amount, note)
          VALUES 
          (1, -12.95, 'test - game from thursday 24th sep'),
          (1, 17.35, 'test - payment'),
          (1, -5, 'test - new ball purchased'),
          (2, 40, 'test - balance increased'),
          (2, -12.95, 'test - game from thursday 24th sep'),
          (2, 17.35, 'test - payment'),
          (2, -5, 'test - new ball purchased'),
          (3, -12.95, 'test - game from thursday 24th sep'),
          (3, 17.35, 'test - payment'),
          (3, -5, 'test - new ball purchased'),
          (3, 40, 'test - balance increased'),
          (4, -12.95, 'test - game from thursday 24th sep'),
          (4, 17.35, 'test - payment'),
          (4, 40, 'test - balance increased'),
          (4, 17.35, 'test - payment'),
          (4, -5, 'test - new ball purchased'),
          (5, 40, 'test - balance increased')
      `,
  ])
  console.log(`Seeded ${transactionsInserted.length} transactions`)

  return {
    createPlayersTable,
    playersInserted,
    createTransactionsTable,
    transactionsInserted
  }
}