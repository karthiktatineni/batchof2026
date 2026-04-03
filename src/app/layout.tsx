import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

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

import { AuthProvider } from '@/context/AuthContext';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        <AuthProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
