import { seed } from "@/lib/seed";
import { sql } from "@vercel/postgres";
import LinkButton from "@/components/linkButton";
import Link from "next/link";

export default async function Home() {
  let startTime = Date.now();
  // await seed(); // drop tables to recreate and seed
  let data =
    await sql`SELECT p.id, p.name, p.is_active, p.is_guest, SUM (t.amount) AS balance FROM players p LEFT JOIN transactions t ON p.id = t.player_id GROUP BY p.id ORDER by p.id`;

  const { rows } = data;
  const duration = Date.now() - startTime;

  return (
    <div className="w-full px-2">
      <div className="flex justify-between max-w-xl mx-auto py-2">
        <p className="space-y-1 text-sm text-gray-500">
          Fetched {rows.length} players in {duration}ms
        </p>
        <LinkButton href="/admin" secondary className="text-sm !py-1">
          Admin
        </LinkButton>
      </div>
      <div className="bg-white/30 py-4 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto">
        <div className="divide-y divide-gray-900/5">
          {rows.map((player, index) => (
            <Link
              key={player.id}
              href={`/${player.id}`}
              className={`${
                !player.is_active && "opacity-30"
              } flex items-center justify-between px-4 py-3 hover:bg-gray-200 hover:cursor-pointer`}
            >
              <div className="flex items-center space-x-4 leading-none">
                <span className="text-sm text-gray-500">{index + 1}</span>
                <span className="font-medium">{player.name}</span>
                {player.is_guest && (
                  <span className="inline px-3 py-1 text-sm font-normal text-gray-500 bg-gray-200 rounded-full gap-x-1">
                    Guest
                  </span>
                )}
              </div>
              <BalanceBadge amount={player.balance} />
            </Link>
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
          ? "text-red-600 bg-red-100/60"
          : "text-emerald-600 bg-emerald-100/60"
      } `}
    >
      <h2 className="text-sm font-normal">{amount || 0}</h2>
    </div>
  );
}
