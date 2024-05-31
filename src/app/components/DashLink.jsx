import Link from "next/link";


export function DashLink({ href, header, description, active }) {

    let linkStateClasses;

    // Inverts the button so that the end user knows where they are in the navbar.
    if (active) {
        linkStateClasses = "rounded px-4 py-2 text-stone-50 bg-stone-800";
    } else {
        linkStateClasses = "rounded px-4 py-2 text-stone-950 bg-stone-200 transition hover:bg-stone-800 hover:text-stone-50"
    }

    return (
        <Link href={href}>
            <div className={linkStateClasses}>
                <h2 className="text-lg font-bold">{header}</h2>
                <p className="text-sm">{description}</p>
            </div>
        </Link>
    )
}
