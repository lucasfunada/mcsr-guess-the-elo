import { ChallengeUI } from "@/components/challenge-ui";
import { getChallengeData } from "@/lib/challenge";
import { connection } from "next/server";

export async function DailyChallenge() {
  await connection();
  const today = new Date().toISOString().slice(0, 10);
  const dailyData = await getChallengeData(today);

  if (!dailyData) {
    return (
      <div className="text-center">
        <h1 className="tracking-wider text-xl font-normal font-minecraft mb-2">No Daily Challenge Today</h1>
        <p>There is no daily challenge available for today. Please check back later.</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl font-normal font-minecraft">
        Daily Challenge #{dailyData.challengeId}
      </h1>
      <ChallengeUI
        challengeId={dailyData.challengeId}
        videoId={dailyData.videoId}
        splits={{
          nether: dailyData.nether,
          bastion: dailyData.bastion,
          fortress: dailyData.fortress,
          blind: dailyData.blind,
          eyeSpy: dailyData.eyeSpy,
          end: dailyData.end,
        }}
        offset={dailyData.offset}
      />
    </>
  );
}
