import { getAllRecords } from "@/app/api/db/controller/record_controller";
import { RecordItem } from "@/app/components/RecordItem";
import Link from "next/link";

export default async function AllRecordsPage() {

    const records = await getAllRecords();

    return (
        <ul>
            <h1>All Records</h1>

            {records.map(recordDoc => {
                const record = JSON.parse(JSON.stringify(recordDoc));
                return (
                    <li key={record._id} className="flex flex-col flex-wrap">
                        <Link href={`/record/${record._id}`}>
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
                        </Link>
                    </li>
                );
            })}

        </ul>
    )
}
