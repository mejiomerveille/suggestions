import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suggestion Box",
  description: "mini application web de post de suggestion concernant primetec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip bg-gray-100">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
