import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Playground V0",
  description: "make your ideas come to life",
  manifest: '/manifest.json',
  appleWebApp: {
    title: 'Leetcode Swiper',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
