import { db } from "@/lib/db";

type Guess = {
    challengeId: string;
    eloGuess: number;
};

type Player = {
    playerElo: number;
    playerName: string;
    playerUuid: string;
};

export async function POST(request: Request) {
    const date = new Date().toISOString().slice(0, 10);

    try {
        const guess = (await request.json()) as Guess;
        if (
            !guess ||
            typeof guess.challengeId !== "string" ||
            !/^[1-9]\d*$/.test(guess.challengeId) ||
            !Number.isInteger(guess.eloGuess) ||
            guess.eloGuess < 0 ||
            guess.eloGuess % 10 !== 0
        ) {
            return Response.json({ error: "Invalid guess" }, { status: 400 });
        }

        const result = await db.query<Player>(
            `
              SELECT
                r.player_elo AS "playerElo",
                r.player_name AS "playerName",
                r.player_uuid AS "playerUuid"
            FROM challenges c
            JOIN runs r ON r.id = c.run_id
            WHERE c.id = $1
                AND c.challenge_date <= $2
                AND r.status = 'approved'
            LIMIT 1
            `,
            [guess.challengeId, date]
        );
        const player = result.rows[0];
        if (!player) {
            return Response.json({ error: "Challenge not found" }, { status: 404 });
        }

        return Response.json({
            ...player,
            score: calculateScore(guess.eloGuess, player.playerElo),
            guess: guess.eloGuess,
        });
    } catch (error) {
        console.error("Error submitting guess:", error);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}

function calculateScore(guessElo: number, actualElo: number): number {
    if (!Number.isFinite(guessElo) || !Number.isFinite(actualElo)) {
        return 0;
    }

    const maxScore = 1000;
    const tolerance = 5;
    const zeroScoreDifference = 800;

    const eloDifference = Math.abs(guessElo - actualElo);
    const adjustedDifference = Math.max(0, eloDifference - tolerance);
    const penalty = maxScore * adjustedDifference / (zeroScoreDifference - tolerance);

    return Math.max(0, Math.round(maxScore - penalty));
}
