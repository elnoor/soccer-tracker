import { db } from "@vercel/postgres";
import { isAdmin } from "../auth/actions";
import { notFound } from "next/navigation";

/**
 * Only admin can run seeding. So, first go to /auth and log in as admin;
 * Then go to /seed to run seeding.
 *
 * If "players" table doesn't exist, it will create table
 * If "players" table exists and has no rows, it will insert new rows.
 * If "transactions" table doesn't exist, it will create table
 * If "transactions" table exists and has no rows, it will insert new rows.
 */
export default async function Seed() {
  if (!(await isAdmin())) {
    notFound();
  }
  const client = await db.connect(); // uses same client for muliple sql queries
  const logs = [];

  let players;
  try {
    players = await client.sql`SELECT * FROM players`; // check if "players" table already exists
    logMessage(logs, 'Table "players" already exists.');
  } catch (e) {
    if (e.message.endsWith(`relation "players" does not exist`)) {
      await client.sql`
        CREATE TABLE IF NOT EXISTS players (
            id SERIAL PRIMARY KEY,
            name VARCHAR (255) UNIQUE NOT NULL,
            is_active BOOLEAN NOT NULL,
            is_guest BOOLEAN NOT NULL,
            phone VARCHAR (255) UNIQUE NOT NULL,
            email VARCHAR (255) UNIQUE NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        `;
      logMessage(logs, `Created "players" table.`);
      players = await client.sql`SELECT * FROM players`;
    } else {
      throw e;
    }
  }

  if (players.rows.length > 0) {
    logMessage(
      logs,
      `Table "players" already has some rows. Skipping inserting new rows.`
    );
  } else {
    const playersInserted = await Promise.all([
      client.sql`
        INSERT INTO players (name, is_active, is_guest, email, phone)
        VALUES 
            ('Elnur', true, false, 'elnur@mail.test1', '11111'),
            ('Elnar', true, false, 'elnar@mail.test1', '22222'),
            ('Riyad', false, true, 'riyad@mail.test1', '33333')
    `,
    ]);
    logMessage(
      logs,
      `Inserted ${playersInserted[0].rowCount} new rows into "players" table.`
    );
  }

  let transactions;
  try {
    transactions = await client.sql`SELECT * FROM transactions`; // check if "transactions" table already exists
    logMessage(logs, `Table "transactions" already exists.`);
  } catch (e) {
    if (e.message.endsWith(`relation "transactions" does not exist`)) {
      await client.sql`
            CREATE TABLE IF NOT EXISTS transactions (
                id SERIAL PRIMARY KEY,
                player_id INT NOT NULL,
                amount DECIMAL NOT NULL DEFAULT 0,
                note VARCHAR (1000),
                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
              );
        `;
      logMessage(logs, `Created "transactions" table.`);
      transactions = await client.sql`SELECT * FROM transactions`;
    } else throw e;
  }

  if (transactions.rows.length > 0) {
    logMessage(
      logs,
      `Table "transactions" already has some rows. Skipping inserting new rows.`
    );
  } else {
    const transactionsInserted = await Promise.all([
      client.sql`
        INSERT INTO transactions (player_id, amount, note)
        VALUES 
            (1, -12.95, 'seeding - game from thursday 24th sep'),
            (1, 17.35, 'seeding - payment'),
            (1, -5, 'seeding - new ball purchased'),
            (2, 40, 'seeding - balance increased'),
            (2, -12.95, 'seeding - game from thursday 24th sep'),
            (2, 17.35, 'seeding - payment'),
            (2, -5, 'seeding - new ball purchased'),
            (3, -12.95, 'seeding - game from thursday 24th sep'),
            (3, 17.35, 'seeding - payment'),
            (3, -5, 'seeding - new ball purchased'),
            (3, 40, 'seeding - balance increased')
        `,
    ]);
    logMessage(
      logs,
      `Inserted ${transactionsInserted[0].rowCount} new rows into "transactions" table.`
    );
  }

  return (
    <div className="px-2 text-left mx-auto">
      {logs.map((l, index) => (
        <p key={index} className="text-grey">
          {l}
        </p>
      ))}
    </div>
  );
}

function logMessage(list, message) {
  list.push(message);
  console.log(message);
}
