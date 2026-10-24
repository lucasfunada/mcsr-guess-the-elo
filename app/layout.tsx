import { Geist_Mono, Inter } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import localFont from "next/font/local";

const minecraftFont = localFont({
  src: "../public/Minecraft-Seven_v2.woff",
  variable: "--minecraft-font",
  display: "swap",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        minecraftFont.variable
      )}
    >
      <body className="flex min-h-svh flex-col lg:flex-row">
        <Header />
        <main className="min-w-0 flex-1">{children}</main>
      </body>
    </html>
  );
}
