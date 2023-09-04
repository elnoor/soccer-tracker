export default function Player({ params }: { params: { player_id: number } }) {
  return <div>Player Id: {params.player_id}</div>;
}
