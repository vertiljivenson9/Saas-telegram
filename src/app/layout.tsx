import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoPost - Post Once, Publish Everywhere Automatically",
  description: "The modern content publishing platform that syncs your posts to Telegram, Twitter, Instagram, and more — all from one beautiful dashboard.",
  keywords: ["AutoPost", "Content Publisher", "Social Media", "Telegram", "SaaS", "Content Management"],
  authors: [{ name: "AutoPost Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "AutoPost - Post Once, Publish Everywhere",
    description: "The modern content publishing platform that syncs your posts to all your social platforms automatically.",
    siteName: "AutoPost",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoPost - Post Once, Publish Everywhere",
    description: "The modern content publishing platform that syncs your posts to all your social platforms automatically.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
