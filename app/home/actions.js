"use server";

import { sql, db } from "@vercel/postgres";

export async function createPlayer(player) {
  const result =
    await sql`INSERT INTO players (name, email, phone, is_active, is_guest)
            VALUES (${player.name}, ${player.email}, ${player.phone}, ${player.is_active}, ${player.is_guest})
            RETURNING id`;

  return result.rows[0].id; // return newly created record's id
}

export async function updatePlayer(player) {
  await sql`UPDATE players
            SET
              name = ${player.name},
              email = ${player.email},
              phone = ${player.phone},
              is_active = ${player.is_active},
              is_guest = ${player.is_guest}
            WHERE id=${player.id}`;
}

export async function deletePlayer(playerId) {
  await sql`DELETE FROM players WHERE id=${playerId}`;
}

export async function createBulkTransactions(playerIds, transaction) {
  // @vercel/postgres package doesn't allow to build sql query dynamically with a loop. So, need to insert one-by-one.
  // Since multiple queries will be run, create a single client to run them. See https://vercel.com/docs/storage/vercel-postgres/sdk#db
  const client = await db.connect();

  playerIds.forEach(async (pid) => {
    await client.sql`INSERT INTO transactions (player_id, created_at, amount, note)
    VALUES (${pid}, ${transaction.created_at}, ${transaction.amount}, ${transaction.note})`;
  });
}
