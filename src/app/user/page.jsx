import {options} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import {UserProfile} from "@/app/user/components/UserProfile";
import {UserMenu} from "@/app/user/components/UserMenu";

export default async function UserPage({}) {
    const session = await getServerSession(options);
    return (
        <>
            <UserMenu></UserMenu>
            <UserProfile></UserProfile>
        </>
    )
}