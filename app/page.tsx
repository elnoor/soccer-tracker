import { sql } from "@vercel/postgres";
import { isAdmin, timeAgo } from "@/lib/utils.js";
import { seed } from "@/lib/seed";
import Link from "next/link";

export default async function Home() {
  let data;
  let startTime = Date.now();

  try {
    data = await sql`SELECT * FROM players`;
  } catch (e: any) {
    if (e.message.endsWith(`relation "players" does not exist`)) {
      await seed(); // Table is not created yet, then seed
      startTime = Date.now();
      data = await sql`SELECT * FROM players`;
    } else {
      throw e;
    }
  }

  const players = data.rows;
  const duration = Date.now() - startTime;

  return (
    <div className="w-full px-2">
      <div className="flex justify-between max-w-xl mx-auto py-2">
        <p className="space-y-1 text-sm text-gray-500">
          Fetched {players.length} players in {duration}ms
        </p>
        <Link
          href="/admin"
          className="group rounded-full flex space-x-1 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-5 py-1 hover:shadow-lg active:shadow-sm transition-all"
        >
          Admin
        </Link>
      </div>
      <div className="bg-white/30 py-4 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto">
        <div className="divide-y divide-gray-900/5">
          {players.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-200"
            >
              <div className="flex items-center space-x-4 leading-none">
                <span className="text-sm text-gray-500">{index + 1}</span>
                <span className="font-medium">{player.name}</span>
              </div>
              {isAdmin() && (
                <Link
                  href={`/${player.id}`}
                  className="text-sm text-gray-500 hover:cursor-pointer"
                >
                  <BalanceBadge amount={-12.56} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BalanceBadge({ amount }: { amount: number }) {
  const isNegative = amount < 0;
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
        isNegative
          ? "text-red-500 bg-red-100/60"
          : "text-emerald-500 bg-emerald-100/60"
      } `}
    >
      <h2 className="text-sm font-normal">{amount}</h2>
    </div>
  );
}
