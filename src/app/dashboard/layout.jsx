/*
Authors: Jordan Lyall
*/

import { DashLink } from "@/app/components/DashLink";
import React from "react";

export default function UserLayout({ children }) {
    return (
        <div className="container mx-auto h-full p-4">
            <div className="flex h-full flex-col gap-4 lg:flex-row lg:justify-between">
                {/* Dash Menu */}
                <div className={"flex flex-col gap-y-2"}>
                    <DashLink active={true}
                        href={"/dashboard/"}
                        header={"Heartbeat"}
                        description={"Database heartbeat and statistics."}>
                    </DashLink>
                    {/* <DashLink
                        href={"/dashboard/profile"}
                        header={"Your Profile"}
                        description={"View and update your profile information."}>
                    </DashLink> */}
                    <DashLink
                        href={"/record/"}
                        header={"Record List"}
                        description={"List of every vase record in the database."}>
                    </DashLink>
                </div>
                {/* Controls Panel */}
                <div className="h-full grow rounded border p-3">
                    {children}
                </div>
            </div>
        </div>
    );
}
