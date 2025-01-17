import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme";
import { Inter } from 'next/font/google';
import "./globals.css";

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
      <body className={`${inter.className} text-gray-100`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
