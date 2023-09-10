"use server";

import { sql } from "@vercel/postgres";

export async function createPlayer(player) {
  const result =
    await sql`INSERT INTO players (name, email, phone, is_active, is_guest)
            VALUES (${player.name}, ${player.email}, ${player.phone}, ${player.is_active}, ${player.is_guest})
            RETURNING id`;

  return result.rows[0].id;
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
