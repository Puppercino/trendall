import RecordList from "@/app/components/RecordList";

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
            <h1>All Records</h1>

            <RecordList records={records} />

        </ul>
    )
}
