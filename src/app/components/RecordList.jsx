import Link from "next/link";
import RemoveBtn from "@/app/components/RemoveBtn";
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

export default async function RecordList() {

    const { records } = await getRecords();

    return (
        <>
            {records.map(record => (
                <div key={record._id} className="my-3 flex items-start justify-between gap-5 border border-slate-300 p-4">
                    <div >
                        <h2 className="text-2xl font-bold">{record.ref_no}</h2>
                        <div>{record.shape}</div>
                    </div>

                    <div> {/* Only admin can edit or remove records? */}
                        <RemoveBtn id={record._id} />
                        <Link href={`/edit_record/${record._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>

                </div>
            ))}
        </>
    )
}