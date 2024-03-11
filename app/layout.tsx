import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Search from "./components/Search";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Search",
  description: "A simple movie search app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col">
          <Search />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
