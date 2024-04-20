"use client";
import {NavLink} from "@/app/components/NavLink";

export function Navbar() {
    return (
        <nav className="border-stone-150 flex justify-between border-b bg-stone-100 text-stone-950">
            <div className="p-6">
                <h1 className="grow text-2xl font-bold text-stone-950">Trendall Project</h1>
            </div>
            <div className="flex justify-center gap-5 p-5">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/search">Search</NavLink>
                <NavLink href="/user">Account</NavLink>
            </div>
        </nav>
    )
}
