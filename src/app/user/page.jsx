import {UserProfile} from "@/app/components/UserProfile";
import {UserMenu} from "@/app/components/UserMenu";

export default async function UserPage({}) {
    return (
        <>
            <UserMenu></UserMenu>
            <UserProfile></UserProfile>
        </>
    )
}