"use client";

import Image from "next/image";

export function Footer() {

    return (
        <nav className="flex items-center justify-between border-t bg-stone-800 text-stone-100">
            <div>
                <Image src={"/ltu-logo.svg"} alt={"Logo for La Trobe University"} width={200} height={68}/>
            </div>
            <div className="px-5 text-right">
                <p className="opacity-50"><i>
                    Developed by Team Athens, 2024
                </i></p>
                <p><small>
                    All content from this archive is property of the
                    A.D. Trendall Research Centre for Ancient Mediterranean Studies.
                </small>
                </p>
            </div>
        </nav>
    );
}
