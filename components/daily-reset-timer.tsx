"use client";

import { useEffect, useState } from "react";

export function DailyResetTimer({ challengeDate }: { challengeDate: string }) {
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  useEffect(() => {
    const resetAt = Date.parse(`${challengeDate}T00:00:00Z`) + 86_400_000;

    function update() {
      setRemainingSeconds(Math.max(0, Math.ceil((resetAt - Date.now()) / 1000)));
    }

    const timeout = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 1000);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [challengeDate]);

  const hours = Math.floor((remainingSeconds ?? 0) / 3600);
  const minutes = Math.floor(((remainingSeconds ?? 0) % 3600) / 60);
  const seconds = (remainingSeconds ?? 0) % 60;
  const countdown = [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");

  return (
    <p className="text-center font-minecraft text-sm" role="timer">
      {remainingSeconds === 0
        ? "A new daily challenge is available. Feel free to finish this one, then refresh when you're ready."
        : `Resets in ${remainingSeconds === null ? "--:--:--" : countdown} (00:00 UTC)`}
    </p>
  );
}
