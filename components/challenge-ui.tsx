"use client";

import { useState } from "react";
import Guesser from "@/components/guesser";
import { VideoPlayer, type Splits } from "@/components/video-player";

export function ChallengeUI({
  challengeId,
  videoId,
  splits,
  offset,
}: {
  challengeId: string;
  videoId: string;
  splits: Splits;
  offset: number;
}) {
  const [playerReady, setPlayerReady] = useState(false);

  return (
    <>
      <VideoPlayer
        videoId={videoId}
        splits={splits}
        onPlayerReadyChange={setPlayerReady}
        offset={offset}
      />
      <Guesser challengeId={challengeId} playerReady={playerReady} />
    </>
  );
}
