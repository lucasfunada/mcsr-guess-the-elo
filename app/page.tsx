import Guesser from "@/components/guesser";
import { VideoPlayer } from "@/components/video-player";

export default function Page() {
  return (
    <div className="flex min-h-[calc(100svh-5rem)] items-center justify-center p-6 lg:min-h-svh">
      <div className="flex w-full max-w-5xl min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="tracking-wider text-xl font-normal font-minecraft">Daily Challenge #1</h1>
          {/* Example splits in seconds; replace with this challenge's actual splits. */}
          <VideoPlayer
            videoId="ebTsJRw7e0c"
            splits={{
              nether: 10,
              bastion: 20,
              fortress: 30,
              blind: 40,
              eyeSpy: 50,
              end: 60,
            }}
          />
          <Guesser />
        </div>
      </div>
    </div>
  );
}
