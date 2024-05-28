"use client";

import { RecordItem } from "@/app/components/RecordItem";

export default function RecordList({ records, limit = -1 }) {

    let slicedRecords = records.slice(0, limit);

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
                        image={record.image}
                    />

                </li>
            ))}
        </ul>
    )
}