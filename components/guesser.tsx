"use client";

import { useState } from "react";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";

interface Result {
  score: number;
  guess: number;
  playerElo: number;
  playerName: string;
  playerUuid: string;
}

const rankMarks = [
  400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1650, 1800,
  2000,
];
const rankStarts = new Set([600, 900, 1200, 1500, 2000]);

interface RankInfo {
  minElo: number;
  label: string;
  color: string;
}

const ranks: RankInfo[] = [
  { minElo: 2000, label: "Netherite", color: "#9627bc" },
  { minElo: 1800, label: "Diamond III", color: "#55ffff" },
  { minElo: 1650, label: "Diamond II", color: "#55ffff" },
  { minElo: 1500, label: "Diamond I", color: "#55ffff" },
  { minElo: 1400, label: "Emerald III", color: "#55ff55" },
  { minElo: 1300, label: "Emerald II", color: "#55ff55" },
  { minElo: 1200, label: "Emerald I", color: "#55ff55" },
  { minElo: 1100, label: "Gold III", color: "#ffaa00" },
  { minElo: 1000, label: "Gold II", color: "#ffaa00" },
  { minElo: 900, label: "Gold I", color: "#ffaa00" },
  { minElo: 800, label: "Iron III", color: "#ffffff" },
  { minElo: 700, label: "Iron II", color: "#ffffff" },
  { minElo: 600, label: "Iron I", color: "#ffffff" },
  { minElo: 500, label: "Coal III", color: "#aaaaaa" },
  { minElo: 400, label: "Coal II", color: "#aaaaaa" },
  { minElo: 0, label: "Coal I", color: "#aaaaaa" },
];

function handleSubmit(elo: number, challengeId: string, setResult: (result: Result | null) => void, setDialogOpen: (open: boolean) => void) {
  fetch("/api/guess", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      challengeId: challengeId,
      eloGuess: elo,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        setResult(data);
        setDialogOpen(true);
      }
    })
    .catch((error) => {
      console.error("Error submitting guess:", error);
      alert("An error occurred while submitting your guess.");
    });
}

export default function Guesser({
  challengeId,
  playerReady,
}: {
  challengeId: string;
  playerReady: boolean;
}) {
  const [elo, setElo] = useState(1500);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const currentRank = ranks.find((rank) => elo >= rank.minElo) ?? ranks[ranks.length - 1];

  return (
    <div className="mx-auto mt-2 w-full">
      <Slider
        value={[elo]}
        onValueChange={(value) =>
          setElo(typeof value === "number" ? value : value[0])
        }
        min={0}
        max={3000}
        step={10}
        label={`Elo: ${elo}`}
        thumbLabel="Elo guess"
      />

      <div
        aria-hidden="true"
        className="relative mt-2 flex h-3 w-full overflow-hidden"
      >
        <div className="w-[20%] bg-[#696969]" />
        <div className="w-[10%] bg-[#999da1]" />
        <div className="w-[10%] bg-[#c99e40]" />
        <div className="w-[10%] bg-[#32885c]" />
        <div className="w-1/6 bg-[#50babc]" />
        <div className="w-1/3 bg-[#79538e]" />
        {rankMarks.map((mark) => (
          <span
            key={mark}
            className={
              rankStarts.has(mark)
                ? "absolute inset-y-0 w-0.5 bg-black/70"
                : "absolute top-1/2 h-1.5 w-px -translate-y-1/2 bg-black/70"
            }
            style={{ left: `${(mark / 3000) * 100}%` }}
          />
        ))}
      </div>

      <div className="relative mt-2 flex justify-between text-xs text-muted-foreground font-minecraft">
        <span>0</span>
        <span className="absolute left-1/2 -translate-x-1/2">1500</span>
        <span>3000</span>
      </div>

      <div
        aria-live="polite"
        className="mt-2 text-center font-minecraft text-xl"
        style={{ color: currentRank.color }}
      >
        {currentRank.label}
      </div>
      <div className="mt-2 text-center">
        <Button variant="minecraft" type="button" className="w-1/4 h-10 text-xl" disabled={!playerReady} onClick={() => handleSubmit(elo, challengeId, setResult, setDialogOpen)}>Submit</Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-background">
          <DialogHeader>
            <DialogTitle className="font-minecraft">Results</DialogTitle>
          </DialogHeader>
          {result ? (
            <div className="flex flex-col items-center gap-2">
              <span className="block text-xl font-bold text-[#ffaa00] font-minecraft">
                YOUR SCORE
              </span>
              <span className="block text-4xl font-bold">
                {result.score} / 1000
              </span>
              <Separator className="mt-4" />
              <div className="flex w-3/4 justify-between">
                <div>
                  <span className="block text-xl font-bold text-[#ffaa00] font-minecraft">
                    YOUR GUESS
                  </span>
                  <span className="block text-4xl font-bold text-center">
                    {result.guess}
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-bold text-[#ffaa00] font-minecraft">
                    RUNNER ELO
                  </span>
                  <span className="block text-4xl font-bold text-center">
                    {result.playerElo}
                  </span>
                </div>


              </div>


              <Separator className="mt-4" />
              <span className="block text-xl font-bold text-[#ffaa00] font-minecraft">
                RUNNER NAME
              </span>
              <span className="block text-4xl font-bold">
                {result.playerName}
              </span>
            </div>

          ) : (
            <DialogDescription>Loading results...</DialogDescription>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
