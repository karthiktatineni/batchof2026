import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "College Memories — A Thousand Stories, One Journey",
  description:
    "A premium digital yearbook and memory archive celebrating our college journey. Relive friendships, fests, achievements, and unforgettable moments in a cinematic experience.",
  keywords: [
    "college memories",
    "digital yearbook",
    "farewell",
    "nostalgia",
    "campus life",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
