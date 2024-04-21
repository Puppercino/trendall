"use client";
import Link from "next/link";

export function NavLink({ href, active, children }) {

    let linkStateClasses;

    // Inverts the button so that the end user knows where they are in the navbar.
    if (active) {
        linkStateClasses = "rounded px-4 py-2 text-stone-50 bg-stone-800";
    } else {
        linkStateClasses = "rounded px-4 py-2 text-stone-950 transition hover:bg-stone-800 hover:text-stone-50"
    }
    return (
        <Link href={href} className={linkStateClasses}>
            {children}
        </Link>
    )
}
