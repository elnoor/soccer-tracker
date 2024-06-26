import { sql } from "@vercel/postgres";
import LinkButton from "@/components/linkButton";
import PlayerModal from "./home/playerModal";
import BulkTransactionsModal from "./home/bulkTransactionsModal";
import Link from "next/link";
import { isAdmin } from "./auth/actions";
import LogOutButton from "./auth/logOutButton";
import Button from "@/components/button";

export const metadata = {
  openGraph: {
    images: `${process.env.WEBSITE_URL}/api/og/${Math.random() * 100}`,
    updatedTime: Math.floor((new Date().getTime()) / 1000)
  },
}

export default async function Home() {
  let startTime = Date.now();
  let data = await sql`
      SELECT p.*, SUM (t.amount) AS balance 
      FROM players p 
      LEFT JOIN transactions t ON p.id = t.player_id 
      GROUP BY p.id 
      ORDER BY p.is_active DESC, p.is_guest ASC, p.id ASC
    `;

  const { rows } = data;
  const duration = Date.now() - startTime;

  const _isAdmin = await isAdmin();

  return (
    <div className="w-full max-w-xl">
      <TopBar
        players={rows}
        duration={duration}
        rowCount={rows.length}
        isAdmin={_isAdmin}
      />
      <div className="bg-white/30 shadow-xl ring-1 ring-gray-900/5 rounded-lg">
        <div className="divide-y divide-gray-900/5">
          {rows.map((player, index) => (
            <div
              key={player.id}
              className="flex px-4 py-3 hover:bg-gray-200 hover:cursor-pointer gap-3"
            >
              <Link
                href={`/${player.id}`}
                className={`${!player.is_active && "opacity-30"
                  } w-full flex items-center justify-between`}
              >
                <div className="flex items-center space-x-4 leading-none">
                  <span className="text-sm text-gray-500">{index + 1}</span>
                  <span className="font-medium">{player.name}</span>
                  {player.is_guest && (
                    <span className="inline px-3 py-1 text-xs font-normal text-gray-500 bg-gray-200 rounded-full gap-x-1">
                      Guest
                    </span>
                  )}
                </div>
                <BalanceBadge amount={player.balance} />
              </Link>
              {_isAdmin && (
                <PlayerModal
                  player={player}
                  isNew={false}
                  className="text-gray-500 hover:text-black font-bold text-xl px-2 -mr-2"
                >
                  ⋮
                </PlayerModal>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function TopBar({
  players,
  rowCount,
  duration,
  isAdmin,
}: {
  players: any;
  rowCount: number;
  duration: number;
  isAdmin: any;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      {isAdmin ? (
        <>
          <BulkTransactionsModal players={players}>
            <Button secondary className="text-sm !py-1">
              Bulk Transactions
            </Button>
          </BulkTransactionsModal>
          <PlayerModal
            player={{
              name: "",
              email: "",
              phone: "",
              is_guest: true,
              is_active: true,
            }}
            isNew={true}
          >
            <Button secondary className="text-sm !py-1">
              New Player
            </Button>
          </PlayerModal>
          <LogOutButton />
        </>
      ) : (
        <>
          <p className="text-sm text-gray-500">
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
  const color =
    !amount || !Number(amount)
      ? "text-gray-600 bg-neutral-200/60"
      : amount < 0
        ? "text-red-600 bg-red-100/60"
        : "text-emerald-600 bg-emerald-100";
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${color}`}
    >
      <h2 className="text-sm font-normal">{amount || 0}</h2>
    </div>
  );
}
