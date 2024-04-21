import { DashLink } from "@/app/components/DashLink";

export default async function UserPage({}) {
    return (
        <div className="flex size-full flex-row flex-wrap-reverse content-center justify-center gap-3">
            <DashLink
                href={"/dashboard/profile"}
                header={"Your Details"}
                description={"View and update your profile information."}
            ></DashLink>
            <DashLink
                href={"/dashboard/profile"}
                header={"Your Details"}
                description={"View and update your profile information."}
            ></DashLink>
            <DashLink
                href={"/dashboard/profile"}
                header={"Your Details"}
                description={"View and update your profile information."}
            ></DashLink>
        </div>
    )
}