import {options} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function UserPage({}) {
    const session = await getServerSession(options);
    return (
        <div className={"m-4"}>
            <h1 className={"text-4xl font-bold"}>Hello {session.user.email}</h1>
            <p>This is the user page. You can only see this if you're logged in.</p>
            <p>If you aren't logged in you are supposed to see a login page instead.</p>
        </div>
    )
}