"use client"

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ResetScroll() {
    const pathname = usePathname();

    useEffect(() => {
        if (window.location.hash) {
            window.history.replaceState(null, "", window.location.pathname);
        }
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [pathname]);

    return null
}