import Link from "next/link";


export function DashLink({href, header, description}) {
    return (
        <Link href={ href }>
            <div className="rounded border-2 border-stone-200 p-3">
                <h2 className="text-xl font-bold">{ header }</h2>
                <p className="text-lg">{ description }</p>
            </div>
        </Link>
    )
}
