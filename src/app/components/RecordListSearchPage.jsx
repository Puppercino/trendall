import Link from "next/link";
import RemoveBtn from "@/app/components/RemoveBtn";
import { RecordItem } from "@/app/components/RecordItemSearchPage";
import { HiPencilAlt } from "react-icons/hi";

const getRecords = async () => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch records')
        }

        return res.json();

    } catch (error) {
        console.error(error)
    }
};

export default async function RecordListSearchPage() {

    const { records } = await getRecords();
    const slicedRecords = records.slice(0, 20); // Change limit here

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

                    {/* Include 2 buttons in record list in edit database page */}
                    {/* <div>
                        <RemoveBtn id={record._id} />
                        <Link href={`/edit_record/${record._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div> */}

                </li>
            ))}
        </ul>
    )
}