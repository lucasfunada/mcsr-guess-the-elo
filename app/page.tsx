import Guesser from "@/components/guesser";
import { VideoPlayer } from "@/components/video-player";

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center p-4 lg:min-h-svh">
      <div className="flex w-full max-w-5xl min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="tracking-wider text-xl font-normal font-minecraft mb-2">Daily Challenge #1</h1>
          {/* Example splits in seconds; replace with this challenge's actual splits. */}
          <VideoPlayer
            videoId="LB3R-sebIUY"
            splits={{
              nether: 10,
              bastion: 54,
              fortress: 148,
              blind: 209,
              eyeSpy: 265,
              end: 280,
            }}
          />
          <Guesser />
        </div>
      </div>
    </div>
  );
}
