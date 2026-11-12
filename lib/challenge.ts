import { db } from "@/lib/db";
import { cacheLife } from "next/cache";

type ChallengeData = {
  challengeId: string;
  date: string;
  videoId: string;
  nether: number | null;
  bastion: number | null;
  fortress: number | null;
  blind: number | null;
  eyeSpy: number | null;
  end: number | null;
  offset: number;
};

export async function getChallengeData(date: string): Promise<ChallengeData | null> {
  "use cache";
  cacheLife("minutes");

  const result = await db.query<ChallengeData>(
    `
      SELECT
        c.id AS "challengeId",
        c.challenge_date::text AS "date",
        r.youtube_id AS "videoId",
        r.split_nether AS "nether",
        r.split_bastion AS "bastion",
        r.split_fortress AS "fortress",
        r.split_blind AS "blind",
        r.split_eyespy AS "eyeSpy",
        r.split_end AS "end",
        r.video_offset AS "offset"
      FROM challenges c
      JOIN runs r ON r.id = c.run_id
      WHERE c.challenge_date = $1
        AND r.status = 'approved'
      LIMIT 1
    `,
    [date]
  );

  return result.rows[0] ?? null;
}
