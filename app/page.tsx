import { sql } from "@vercel/postgres";
import LinkButton from "@/components/linkButton";
import Link from "next/link";
import { isAdmin } from "./auth/actions";
import LogOutButton from "./auth/logOutButton";

export default async function Home() {
  let startTime = Date.now();
  let data = await sql`
      SELECT p.id, p.name, p.is_active, p.is_guest, SUM (t.amount) AS balance 
      FROM players p 
      LEFT JOIN transactions t ON p.id = t.player_id 
      GROUP BY p.id 
      ORDER by p.id
    `;

  const { rows } = data;
  const duration = Date.now() - startTime;

  return (
    <div className="w-full px-2">
      <TopBar duration={duration} rowCount={rows.length} />
      <div className="bg-white/30 py-4 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto">
        <div className="divide-y divide-gray-900/5">
          {rows.map((player, index) => (
            <Link
              key={player.id}
              href={`/player/${player.id}`}
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

async function TopBar({
  rowCount,
  duration,
}: {
  rowCount: number;
  duration: number;
}) {
  const _isAdmin = await isAdmin();

  return (
    <div className="flex justify-between max-w-xl mx-auto py-2">
      {_isAdmin ? (
        <>
          <LinkButton href="/game" secondary className="text-sm !py-1">
            New Game
          </LinkButton>
          <LinkButton href="/player" secondary className="text-sm !py-1">
            New Player
          </LinkButton>
          <LogOutButton />
        </>
      ) : (
        <>
          <p className="space-y-1 text-sm text-gray-500">
            Fetched {rowCount} players in {duration}ms
          </p>
          <LinkButton href="/auth" secondary className="text-sm !py-1">
            Admin
          </LinkButton>
        </>
      )}
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
