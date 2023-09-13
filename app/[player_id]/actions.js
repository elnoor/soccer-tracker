"use server";

import { sql } from "@vercel/postgres";

export async function createTransaction(transaction) {
  try {
    const result =
      await sql`INSERT INTO transactions (player_id, created_at, amount, note)
                    VALUES (${transaction.player_id}, ${transaction.created_at}, ${transaction.amount}, ${transaction.note})
                    RETURNING id`;

    return result.rows[0].id; // return newly created record's id
  } catch (e) {
    console.log("Error inserting new transaction:", e);
    return -1;
  }
}

export async function updateTransaction(transaction) {
  try {
    await sql`UPDATE transactions
            SET
              created_at = ${transaction.created_at},
              amount = ${transaction.amount},
              note = ${transaction.note}
            WHERE id=${transaction.id}`;
    return true;
  } catch (e) {
    console.log("Error updating transaction:", e);
    return false;
  }
}

export async function deleteTransaction(transactionId) {
  try {
    await sql`DELETE FROM transactions WHERE id=${transactionId}`;
    return true;
  } catch (e) {
    console.log("Error deleting transaction:", e);
    return false;
  }
}
