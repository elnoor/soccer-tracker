"use server";

import { sql } from "@vercel/postgres";

export async function createTransaction(transaction) {
  const result = await sql`INSERT INTO transactions (player_id, created_at, amount, note)
                    VALUES (${transaction.player_id}, ${transaction.created_at}, ${transaction.amount}, ${transaction.note})
                    RETURNING id`;

  return result.rows[0].id; // return newly created record's id
}

export async function updateTransaction(transaction) {
  await sql`UPDATE transactions
            SET
              created_at = ${transaction.created_at},
              amount = ${transaction.amount},
              note = ${transaction.note}
            WHERE id=${transaction.id}`;
}

export async function deleteTransaction(transactionId) {
  await sql`DELETE FROM transactions WHERE id=${transactionId}`;
}
