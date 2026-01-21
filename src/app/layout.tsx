import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import { LoadingProvider } from "@/context/LoadingContext";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Saad Mehmood | Creative Content Producer",
  description: "A cinematic journey through the work of Saad Mehmood.",
};

import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        <LoadingProvider>
          <Loader />
          <ClientLayoutWrapper>
            <SmoothScrolling>{children}</SmoothScrolling>
          </ClientLayoutWrapper>
        </LoadingProvider>
      </body>
    </html>
  );
}
