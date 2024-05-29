import React from "react";
import { Note } from "@/app/components/Note";
import Record from "@/app/api/db/model/record_model";

export default async function UserPage({ }) {

    const records = await Record;
    let record_count;

    if (records) {
        try {
            record_count = await records.countDocuments();
        } catch (e) {
            console.log(e);
            record_count = "unknown";
        }
    } else {
        console.log("[!] Record schema not OK.")
    }


    return (
        <>
            <h1>
                System Heartbeat
            </h1>

            <p>
                If something isn&apos;t working as expected, Heartbeat is the first place to check
                for any issues. Below is a summary of the system&apos;s current status.
                <br></br>
                Please contact the system administrator if you need further assistance.
            </p>

            <ul className={"py-2 text-lg"}>
                <li>
                    <Note type={"success"}>
                        <p>Database connected.</p>
                    </Note>
                </li>
                <li>
                    <Note type={"success"}>
                        <p>Record schema OK.</p>
                    </Note>
                </li>
                <li>
                    <Note>
                        <p>There are around <b>{record_count}</b> vase records.</p>
                    </Note>
                </li>
                {/* <li>
                    <Note>
                        <p>Image schema unknown.</p>
                    </Note>
                </li>
                <li>
                    <Note>
                        <p>There are a unknown amount of original images.</p>
                    </Note>
                </li> */}
            </ul>
        </>
    )
}