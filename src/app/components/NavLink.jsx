import Link from "next/link";

export function NavLink({ href, children }) {
    return (
        <Link href={href} className="rounded px-4 py-2 text-stone-950 transition hover:bg-stone-800 hover:text-stone-50">
            {children}
        </Link>
    )
}
