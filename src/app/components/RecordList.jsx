import Link from "next/link";
import RemoveBtn from "@/app/components/RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getRecords = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/db/routes', {
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
                <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
                    <div >
                        <h2 className="font-bold text-2xl">{record.ref_no}</h2>
                        <div>{record.shape}</div>
                    </div>

                    <div>
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