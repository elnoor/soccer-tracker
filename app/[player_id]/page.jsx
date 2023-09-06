import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import PlayerProfile from "@/components/playerProfile";
import { isAdmin } from "@/lib/auth";

export default async function Player({ params }) {
  let data = await sql`SELECT * FROM players WHERE id=${Number(
    params.player_id
  )}`;
  const player = data?.rows?.[0];

  if (!player) notFound();

  return <PlayerProfile player={player} isAdmin={isAdmin()} />;
}
