import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import BambooNavbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer";
import { Toaster } from "react-hot-toast";
 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eco World BD",
   icons: {
    icon: "/download (1).jpg",   
  },
  description: "Eco-friendly handmade crafts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        {/* Navbar */}
        <BambooNavbar />

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
        <Toaster/>

       <Footer/>
      </body>
    </html>
  );
}