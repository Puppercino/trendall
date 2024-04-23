"use client";

import Link from "next/link";
import { RecordItem } from "@/app/components/RecordItem";

// const getRecords = async () => {
//     try {
//         const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
//             cache: 'no-store',
//         });

//         if (!res.ok) {
//             throw new Error('Failed to fetch records')
//         }

//         return res.json();

//     } catch (error) {
//         console.error(error)
//     }
// };

export default async function RecordList({ records, limit = -1 }) {

    // const { records } = await getRecords();
    const slicedRecords = records.slice(0, limit);

    return (
        <ul>
            {slicedRecords.map(record => (
                <li key={record._id} className="flex flex-col flex-wrap">

                    <RecordItem
                        id={record._id}
                        ref_no={record.ref_no}
                        shape={record.shape}
                        curr_coll={record.curr_coll}
                        prev_coll={record.prev_coll}
                        provenance={record.provenance}
                        height={record.height}
                        diameter={record.diameter}
                        plate={record.plate}
                        publication={record.publication}
                        description={record.description}
                    />

                </li>
            ))}
        </ul>
    )
}