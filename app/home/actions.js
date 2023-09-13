"use server";

import { sql, db } from "@vercel/postgres";

export async function createPlayer(player) {
  try {
    const result =
      await sql`INSERT INTO players (name, email, phone, is_active, is_guest)
            VALUES (${player.name}, ${player.email}, ${player.phone}, ${player.is_active}, ${player.is_guest})
            RETURNING id`;

    return result.rows[0].id; // return newly created record's id
  } catch (e) {
    console.log("Error inserting new user:", e);
    return -1;
  }
}

export async function updatePlayer(player) {
  try {
    await sql`UPDATE players
            SET
              name = ${player.name},
              email = ${player.email},
              phone = ${player.phone},
              is_active = ${player.is_active},
              is_guest = ${player.is_guest}
            WHERE id=${player.id}`;
    return true;
  } catch (e) {
    console.log("Error updating user:", e);
    return false;
  }
}

export async function deletePlayer(playerId) {
  try {
    const client = await db.connect(); // uses same client (connection) for multiple sql queries
    await client.sql`DELETE FROM players WHERE id=${playerId}`;
    await client.sql`DELETE FROM transactions WHERE player_id=${playerId}`;
    return true;
  } catch (e) {
    console.log("Error deleting user:", e);
    return false;
  }
}

export async function createBulkTransactions(playerIds, transaction) {
  try {
    const arr = playerIds.map((pid) => ({ ...transaction, player_id: pid }));

    sql.query(
      `INSERT INTO transactions (player_id, amount, note, created_at)
      SELECT player_id, amount, note, created_at FROM json_populate_recordset(NULL::transactions, $1)`,
      [JSON.stringify(arr)]
    );
    return true;
  } catch (e) {
    console.log("Error bulk inserting transactions:", e);
    return false;
  }
}
