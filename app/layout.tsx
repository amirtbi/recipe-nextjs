import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./header";
import { Hydration } from "./hydration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My App",
  description: "Clean mobile-first layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full w-full scroll-smooth min-h-screen bg-slate-300 text-gray-900`}
      >
        <div className="relative min-h-screen">
          <Hydration>
            <main className="pb-20 px-4 overflow-y-auto">{children}</main>
            <Header />
          </Hydration>
        </div>
      </body>
    </html>
  );
}
