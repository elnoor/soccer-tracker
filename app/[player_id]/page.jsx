import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import PlayerProfile from "@/components/playerProfile";
import { isAdmin } from "../auth/actions";

export default async function Player({ params }) {
  const _isAdmin = await isAdmin();
  let data = await sql`SELECT * FROM players WHERE id=${Number(
    params.player_id
  )}`;
  const player = data?.rows?.[0];

  if (!player) notFound();

  return <PlayerProfile player={player} isAdmin={_isAdmin} />;
}
