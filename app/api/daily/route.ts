import { db } from "@/lib/db";
import { cacheLife } from "next/cache";

type DailyData = {
  challengeId: string;
  date: string;
  videoId: string;
  nether: number | null;
  bastion: number | null;
  fortress: number | null;
  blind: number | null;
  eyeSpy: number | null;
  end: number | null;
};

export async function GET() {
  // Include the UTC date in the cache key so a new day gets a new entry.
  const date = new Date().toISOString().slice(0, 10);

  try {
    const dailyData = await getDailyData(date);

    if (!dailyData) {
      return Response.json({ error: "No challenge today" }, { status: 404 });
    }

    return Response.json(dailyData);
  } catch (error) {
    console.error("Failed to load daily challenge", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

async function getDailyData(date: string): Promise<DailyData | null> {
  "use cache";
  cacheLife("minutes");

  const result = await db.query<DailyData>(
    `
      SELECT
        c.id::text AS "challengeId",
        c.challenge_date::text AS "date",
        r.youtube_id AS "videoId",
        r.split_nether AS "nether",
        r.split_bastion AS "bastion",
        r.split_fortress AS "fortress",
        r.split_blind AS "blind",
        r.split_eyespy AS "eyeSpy",
        r.split_end AS "end"
      FROM challenges c
      JOIN runs r ON r.id = c.run_id
      WHERE c.challenge_date = $1
        AND r.approved_at IS NOT NULL
      LIMIT 1
    `,
    [date]
  );

  return result.rows[0] ?? null;
}
