import type { Metadata } from "next";
import ReduxProvider from "./provider";
import { Archivo } from "next/font/google";
import { AppContentWrapper, AppNavBar } from "./layout-wrappers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conductor NG",
  description:
    "We're all about sharing rides- cutting costs, making travel a breeze, and doing our part for the planet",
};

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.className}`}>
      <body>
        <ReduxProvider>
          <div className="fixed top-0 right-0 left-0 bg-white z-50">
            <AppNavBar />
          </div>
          <AppContentWrapper>{children}</AppContentWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
