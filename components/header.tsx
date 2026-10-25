"use client";

import Link from "next/link";
import { Archive, CalendarDays, Menu, Upload, X } from "lucide-react";
import { Separator } from "./ui/separator";

export function Header() {
  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background lg:hidden">
        <div className="relative flex h-16 w-full items-center gap-4 px-2 sm:px-6">
          <details className="group">
            <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-md hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
              <span className="sr-only">Toggle navigation menu</span>
              <Menu aria-hidden="true" className="size-5 group-open:hidden" />
              <X
                aria-hidden="true"
                className="hidden size-5 group-open:block"
              />
            </summary>
            <nav
              aria-label="Mobile navigation"
              className="absolute inset-x-0 top-16 flex flex-col border-b bg-background p-4 shadow-sm"
            >
              <Link
                href="/"
                onClick={(event) =>
                  event.currentTarget
                    .closest("details")
                    ?.removeAttribute("open")
                }
                className="rounded-md px-2 py-3 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
              >
                Daily Challenge
              </Link>
              <Separator />
              <Link
                href="/submit"
                onClick={(event) =>
                  event.currentTarget
                    .closest("details")
                    ?.removeAttribute("open")
                }
                className="rounded-md px-2 py-3 text-sm font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
              >
                Submit a run
              </Link>
            </nav>
          </details>
          <div className="px-3">
            <span className="block text-xs leading-4 text-foreground/70">
              MCSR Ranked
            </span>
            <span className="block text-xl font-bold">
              GUESS THE <span className="text-[#ffaa00]">ELO</span>
            </span>
          </div>
        </div>
      </header>
      <aside className="sticky top-0 hidden h-svh w-60 shrink-0 flex-col border-r bg-background p-4 lg:flex">
        <div className="px-3">
          <span className="block text-xs leading-4 text-foreground/70">
            MCSR Ranked
          </span>
          <span className="block text-xl font-bold">
            GUESS THE <span className="text-[#ffaa00]">ELO</span>
          </span>
        </div>
        <Separator className="mt-4" />
        <nav
          aria-label="Main navigation"
          className="mt-4 flex flex-col gap-1 text-foreground/70"
        >
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-normal hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <CalendarDays aria-hidden="true" className="size-4 shrink-0" />
            Daily Challenge
          </Link>
          <Link
            href="/archive"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-normal hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <Archive aria-hidden="true" className="size-4 shrink-0" />
            Archive
          </Link>
          <Link
            href="/submit"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-normal hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <Upload aria-hidden="true" className="size-4 shrink-0" />
            Submit a Run
          </Link>
        </nav>
      </aside>
    </>
  );
}
