export default function Page() {
    return (
        <div className={"m-4"}>
            <h1 className={"text-4xl font-bold"}>Your Account</h1>
            <p>This is the user page. You can only see this if you're logged in.</p>
            <p>If you aren't logged in you are supposed to see a login page instead.</p>
        </div>
    )
}