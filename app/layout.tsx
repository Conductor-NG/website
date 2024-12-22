import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";

const hilmar = localFont({
  src: [
    {
      path: "./fonts/hilmar-sans/Hilmar-Light.otf",
      weight: "400",
    },
    {
      path: "./fonts/hilmar-sans/Hilmar-Medium.otf",
      weight: "600",
    },
    {
      path: "./fonts/hilmar-sans/Hilmar-Regular.otf",
      weight: "500",
    },
  ],
  variable: "--font-hilmar",
});

import NavBar from "./components/navbar/navbar.component";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conductor NG",
  description:
    "We're all about sharing rides- cutting costs, making travel a breeze, and doing our part for the planet",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "500", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${hilmar.variable}`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
