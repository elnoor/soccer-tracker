import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import { isAdmin } from "../../auth/actions";
import PlayerProfile from "../playerProfile";

export default async function Player({ params }) {
  const playerId = Number(params.player_id);

  let playerData = await sql`SELECT * FROM players WHERE id=${playerId}`;
  const player = playerData?.rows?.[0];

  if (!player) {
    notFound();
  }

  let transactionsData =
    await sql`SELECT * FROM transactions WHERE player_id=${playerId} order by id desc`;
  const transactions = transactionsData.rows;

  const _isAdmin = await isAdmin();

  return (
    <div className="w-full md:w-auto flex flex-col">
      <PlayerProfile player={player} isAdmin={_isAdmin} />
      <Transactions transactions={transactions} />
    </div>
  );
}

function Transactions({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return <p className="text-center mt-10">No transactions found</p>;
  }

  return (
    <table className="mt-10 bg-white/30 shadow-xl ring-1 ring-gray-900/5 rounded-lg">
      <thead className="bg-gray-200">
        <tr className="text-gray-500 text-left">
          <th className="p-1 pl-3">Id</th>
          <th className="p-1">Date</th>
          <th className="p-1">Amount</th>
          <th className="p-1 pr-3">Notes</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr
            key={t.id}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-200"
          >
            <td className="p-2 pl-3 text-sm">{t.id}</td>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
}
