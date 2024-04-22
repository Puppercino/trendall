import {DashLink} from "@/app/components/DashLink";
import React from "react";

export default function UserLayout({ children }) {
    return (
        <div className="container mx-auto h-full p-4">
            <div className="flex h-full flex-col gap-4 lg:flex-row lg:justify-between">
                {/* Dash Menu */}
                <div>
                    <DashLink
                        href={"/dashboard/profile"}
                        header={"Your Details"}
                        description={"View and update your profile information."}
                    ></DashLink>
                </div>
                {/* Controls Panel */}
                <div className="h-full grow rounded border p-3">
                    {children}
                </div>
            </div>
        </div>
    );
}
