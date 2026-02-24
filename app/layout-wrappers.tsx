"use client";

import {ReactNode} from "react";
import {usePathname} from "next/navigation";
import NavBar from "@/components/navbar/navbar.component";

export function AppNavBar() {
    const pathname = usePathname();
    if (pathname?.startsWith("/campaign") || pathname?.startsWith("/downloads")) {
        return null;
    }
    return <NavBar/>;
}

export function AppContentWrapper({children}: { children: ReactNode }) {
    const pathname = usePathname();
    const removeTopMargin = pathname?.startsWith("/campaign") || pathname?.startsWith("/downloads");
    return <div className={removeTopMargin ? "" : "mt-[150px]"}>{children}</div>;
}
