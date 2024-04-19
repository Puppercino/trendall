import {NavLink} from "@/app/components/NavLink";

export function Navbar() {
    return (
        <nav className="border-stone-150 flex justify-center gap-5 border-b bg-stone-100 p-5 text-stone-950">
            <h1 className="grow p-1 text-2xl font-bold text-stone-950">Trendall</h1>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/search">Search</NavLink>
            <NavLink href="/user">Account</NavLink>
        </nav>
    )
}
