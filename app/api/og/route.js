import { ImageResponse } from '@vercel/og';
import { sql } from "@vercel/postgres";

// see how this endpoint has been used in the manifest of page.tsx (Default/Home) for og meta tag
export async function GET() {
  try {
    let data = await sql`
      SELECT p.name, SUM (t.amount) AS balance 
      FROM players p 
      LEFT JOIN transactions t ON p.id = t.player_id 
      WHERE p.is_active = true
      GROUP BY p.id 
      ORDER BY balance
      LIMIT 8
    `;

    const { rows } = data;

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 70,
            color: '#404040',
            background: 'white',
            width: '800px',
            height: '800px',
            padding: '50px',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {rows.length && rows.length && rows.map((r, index) => {
            return (
              <div style={{ display: "flex", width: "100%" }} key={index}>
                <div style={{ width: "60%" }}>{r.name}</div>
                <div style={{ color: r.balance < 0 ? "red" : "green" }}>{r.balance}</div>
              </div>
            )
          })}
        </div>
      ),
      {
        width: 800,
        height: 800,
      },
    );
  }
  catch (e) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 50,
            color: 'black',
            background: 'white',
            width: '600px',
            height: '600px',
            padding: '50px',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          OG image could not be generated!
        </div>
      ),
      {
        width: 600,
        height: 600,
      },
    );
  }
}