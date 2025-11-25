import type { Metadata } from "next";
import {  DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage_grotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const dm_sans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather Next App",
  description: "Using Open Meteo API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dm_sans.variable} ${bricolage_grotesque.variable}`}>
        {children}
      </body>
    </html>
  );
}
