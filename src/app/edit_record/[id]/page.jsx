import EditRecordForm from "@/app/components/EditRecordForm"

const getRecordById = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch record')
        }

        return res.json();

    } catch (error) {
        console.error(error)
    }
};

export default async function EditRecord({ params }) {

    const { id } = params;
    const { record } = await getRecordById(id);
    const { ref_no, shape } = record;

    return <EditRecordForm id={id} ref_no={ref_no} shape={shape} />
}