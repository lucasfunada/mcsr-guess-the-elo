/// <reference types="youtube" />
"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const splitButtons = [
  { key: "nether", label: "Nether", color: "#521f20" },
  { key: "bastion", label: "Bastion", color: "#2c2936" },
  { key: "fortress", label: "Fortress", color: "#281117" },
  { key: "blind", label: "Blind", color: "#3b2754" },
  { key: "eyeSpy", label: "Eye Spy", color: "#4e8478" },
  { key: "end", label: "End", color: "#032620" },
] as const;

export type Splits = {
  nether: number;
  bastion: number;
  fortress: number;
  blind: number;
  eyeSpy: number;
  end: number;
};

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
  }
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function VideoPlayer({
  videoId,
  splits,
}: {
  videoId: string;
  splits: Splits;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const [apiReady, setApiReady] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    const handleApiReady = () => {
      previousCallback?.();
      setApiReady(true);
    };
    window.onYouTubeIframeAPIReady = handleApiReady;

    return () => {
      if (window.onYouTubeIframeAPIReady === handleApiReady) {
        window.onYouTubeIframeAPIReady = previousCallback;
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!apiReady || !container) return;

    setPlayerReady(false);
    const playerElement = document.createElement("div");
    container.replaceChildren(playerElement);

    const player = new YT.Player(playerElement, {
      videoId,
      width: "100%",
      height: "100%",
      playerVars: {
        playsinline: 1,
      },
      events: {
        onReady: () => {
          setPlayerReady(true);
        },
      },
    });

    playerRef.current = player;

    return () => {
      player.destroy();
      playerRef.current = null;
      container.replaceChildren();
    };
  }, [apiReady, videoId]);

  return (
    <>
      <Script
        src="https://www.youtube.com/iframe_api"
        onReady={() => {
          if (typeof YT !== "undefined" && typeof YT.Player === "function") {
            setApiReady(true);
          }
        }}
      />
      <div ref={containerRef} className="aspect-video w-full" />
      <div
        className="mt-4 grid w-full grid-cols-3 gap-4 md:grid-cols-6"
        aria-label="Run Splits"
      >
        {splitButtons.map(({ key, label, color }) => (
          <Button
            variant="minecraft"
            key={key}
            type="button"
            disabled={!playerReady}
            onClick={() => playerRef.current?.seekTo(splits[key], true)}
            style={{ backgroundColor: color }}
            className="flex h-16 w-full min-w-0 flex-col gap-0 p-2 hover:brightness-110 md:px-6"
          >
            <span className="text-xl">
              {label}
            </span>
            {splits[key] !== undefined && (
              <span className="ml-1 text-lg text-muted-foreground">
                {formatTime(splits[key])}
              </span>
            )}
          </Button>
        ))}
      </div>
    </>
  );
}
