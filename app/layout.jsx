import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "Spam Detector",
  description: "Simple spam detector tool to analyze a text content.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-gray-50 ${inter.className}`}>
        <main className="flex flex-col min-h-screen">{children}</main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
