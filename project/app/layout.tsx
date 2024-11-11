"use client";
import localFont from "next/font/local";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import store from "./redux/store";
import { Provider } from "react-redux";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

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
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
