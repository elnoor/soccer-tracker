"use server";

import { sql } from "@vercel/postgres";

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
  const arr = playerIds.map((pid) => ({ ...transaction, player_id: pid }));

  sql.query(
    `INSERT INTO transactions (player_id, amount, note, created_at)
      SELECT player_id, amount, note, created_at FROM json_populate_recordset(NULL::transactions, $1)`,
    [JSON.stringify(arr)]
  );
}
