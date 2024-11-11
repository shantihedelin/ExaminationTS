"use client";
import localFont from "next/font/local";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import store from "./redux/store";
import { Provider } from "react-redux";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={firaSans.className}>
      <body className="bg-[##489078]">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
