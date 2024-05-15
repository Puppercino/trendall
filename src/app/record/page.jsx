import RecordList from "@/app/components/RecordList";
import Link from "next/link";

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

export default async function AllRecordsPage() {

    const { records } = await getRecords();

    return (
        <ul>
            <div className="flex items-center justify-between">

                <h1>All Records</h1>

                <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    href={'/add_record'}>
                    Add record
                </Link>

            </div>

            <RecordList records={records} />

        </ul>
    )
}
