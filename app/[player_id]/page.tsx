
import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import PlayerProfile from "@/components/playerProfile";

export default async function Player({
  params,
}: {
  params: { player_id: number };
}) {
  let data = await sql`SELECT * FROM players WHERE id=${Number(
    params.player_id
  )}`;
  const player = data?.rows?.[0];

  if (!player) notFound();

  return <PlayerProfile player={player} />;
}
