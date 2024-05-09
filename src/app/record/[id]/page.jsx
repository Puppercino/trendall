import Image from "next/image";

const getOneRecord = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch this record')
        }

        return res.json();

    } catch (error) {
        console.error(error);
    }
};

export default async function RecordPage({ params }) {

    const { record } = await getOneRecord(params.id);

    return (
        <div className="flex">
            <div className="w-1/2">
                <Image className={"rounded-l mr-4"} src={"/vase_placeholder.png"} alt={"Vase image"} height={500} width={500}></Image>
            </div>
            <div className="w-1/2">
                <h1>Record {record._id}</h1>
                <p>Ref No: {record.ref_no}</p>
                <p>Shape: {record.shape}</p>
                <p>Current Collection: {record.curr_coll}</p>
                <p>Previous Collection: {record.prev_coll}</p>
                <p>Provenance: {record.provenance}</p>
                <p>Height: {record.height}</p>
                <p>Diameter: {record.diameter}</p>
                <p>Plate: {record.plate}</p>
                <p>Publication: {record.publication}</p>
                <p>Description: {record.description}</p>
            </div>
        </div>
    );
}