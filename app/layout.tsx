import type {Metadata} from "next";
import ReduxProvider from "./provider";
import {Archivo} from "next/font/google";
import NavBar from "@/components/navbar/navbar.component";
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

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={archivo.className}>
        <body className="antialiased">
        <ReduxProvider>
            {/* NavBar handles its own fixed/sticky positioning internally */}
            <NavBar/>

            {/* Use a main tag for better SEO/Semantics */}
            <main>{children}</main>
        </ReduxProvider>
        </body>
        </html>
    );
}