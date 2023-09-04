import { sql } from '@vercel/postgres'
import { timeAgo } from '@/lib/utils'
import RefreshButton from './refresh-button'
import { seed } from '@/lib/seed'

export default async function Table() {
  let data
  let startTime = Date.now()

  try {
    data = await sql`SELECT * FROM players`
  } catch (e: any) {
    if (e.message.endsWith(`relation "players" does not exist`)) {
      await seed()  // Table is not created yet, then seed
      startTime = Date.now()
      data = await sql`SELECT * FROM players`
    } else { throw e }
  }

  const { rows: players } = data
  const duration = Date.now() - startTime
  console.log(data);
  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">
            Fetched {players.length} players in {duration}ms
          </p>
        </div>
        <RefreshButton />
      </div>
      <div className="divide-y divide-gray-900/5">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <p className="font-medium leading-none">{player.name}</p>
                <p className="text-sm text-gray-500">{player.email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{timeAgo(player.created_at)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
