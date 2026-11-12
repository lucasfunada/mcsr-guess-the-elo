import { DailyChallenge } from "@/components/daily-challenge";

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center p-4 lg:min-h-svh">
      <div className="flex w-full max-w-5xl min-w-0 flex-col gap-4 text-sm leading-loose">
        <DailyChallenge />
      </div>
    </div>
  );
}
