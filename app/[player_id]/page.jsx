import { db } from "@vercel/postgres";
import { notFound } from "next/navigation";
import { isAdmin } from "../auth/actions";
import TransactionModal from "./transactionModal.jsx";
import Button from "@/components/button";

export default async function PlayerTransactions({ params }) {
  const playerId = Number(params.player_id);
  const client = await db.connect();  // uses same client for muliple sql queries

  let playerData = await client.sql`SELECT name FROM players WHERE id=${playerId}`;
  const player = playerData?.rows?.[0];

  if (!player) {
    notFound();
  }

  let transactionsData =
    await client.sql`SELECT * FROM transactions WHERE player_id=${playerId} order by id desc`;
  const transactions = transactionsData.rows;

  const _isAdmin = await isAdmin();

  return (
    <div className="w-full max-w-xl flex flex-col">
      <div className="flex items-center justify-between py-2">
        <p
          className={`text-sm text-gray-500 ${
            !_isAdmin ? "w-full text-center" : ""
          }`}
        >
          There are {transactions.length} transactions for {player.name}
        </p>
        {_isAdmin && (
          <TransactionModal
            isNew={true}
            transaction={{
              player_id: playerId,
              created_at: new Date(),
              note: "",
              amount: 0,
            }}
            enabled={true}
          >
            <Button secondary className="text-sm !py-1">
              New Transaction
            </Button>
          </TransactionModal>
        )}
      </div>
      {transactions.length > 0 && (
        <table className="bg-white/30 shadow-xl ring-1 ring-gray-900/5 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr className="text-gray-500 text-left">
              <th className="font-medium p-1 pl-3">#</th>
              <th className="font-medium p-1">Date</th>
              <th className="font-medium p-1">Amount</th>
              <th className="font-medium p-1 pr-3">Note</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, index) => (
              <TransactionModal
                key={t.id}
                transaction={t}
                isNew={false}
                enabled={_isAdmin}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 hover:cursor-pointer"
              >
                <td className="p-2 pl-3 text-sm">
                  {transactions.length - index}
                </td>
                <td className="p-2" title={t.created_at.toLocaleString()}>
                  {t.created_at.toLocaleDateString()}
                </td>
                <td
                  className={`p-2 ${
                    t.amount < 0 ? "bg-red-100/60" : "bg-emerald-100/60"
                  }`}
                >
                  {t.amount}
                </td>
                <td className="p-2 pr-3 text-sm max-w-md">{t.note}</td>
              </TransactionModal>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
