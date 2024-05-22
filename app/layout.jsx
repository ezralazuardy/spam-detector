import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spam Detector",
  description: "Simple spam detector tool to analyze your email content.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col min-h-screen bg-gray-100">
          {children}
        </main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
