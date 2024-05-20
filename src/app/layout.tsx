import type { Metadata } from "next";
import "./globals.css";
import {Noto_Sans} from 'next/font/google'

const inter = Noto_Sans({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Сайт ВА",
  description: "Generated by create next app",
  icons: {
    icon: '/favicon.ico',
  }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}