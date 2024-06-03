/*
Authors: Jordan Lyall
*/

export function Note({ type, children }) {
    let noteClasses;
    switch (String(type)) {
        case "info":
            noteClasses = "bg-blue-100 text-blue-900 border-blue-300";
            break;

        case "warning":
            noteClasses = "bg-yellow-100 text-yellow-900 border-yellow-300";
            break;

        case "error":
            noteClasses = "bg-red-100 text-red-900 border-red-300";
            break;

        case "success":
            console.log("Its success")
            noteClasses = "bg-green-100 text-green-900 border-green-300";
            break;

        default:
            noteClasses = "bg-stone-100 text-stone-900 border-stone-300";
            break;
    }
    console.log(noteClasses)

    return (
        <div className={"my-2 rounded border p-2 " + noteClasses}>
            {children}
        </div>
    )
}
