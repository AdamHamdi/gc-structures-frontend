import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import 'primeicons/primeicons.css';
import "@/styles/globals.scss"; 
import Header from "./components/header";
import Footer from "./components/footer";
import CookieBanner from "./components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GC Structures",
  description: "Bureau d'études en génie civil et structures",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
