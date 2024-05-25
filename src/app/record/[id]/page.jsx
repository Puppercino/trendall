import Image from "next/image";
import RemoveBtn from "@/app/components/RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

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

    let recordImage = record.image ? `/images/${record.image}` : "/vase_placeholder.png";
    let curr_coll = record.curr_coll ? record.curr_coll : "N/A";
    let prev_coll = record.prev_coll ? record.prev_coll : "N/A";
    let provenance = record.provenance ? record.provenance : "N/A";
    let height = record.height ? record.height : "N/A";
    let diameter = record.diameter ? record.diameter : "N/A";
    let plate = record.plate ? record.plate : "N/A";
    let publication = record.publication ? record.publication : "N/A";
    let description = record.description ? record.description : "N/A";

    return (
        <div className="flex">
            <div className="w-1/3 mr-10">
                <Image className={"rounded-l mr-4"} src={recordImage} alt={"Vase image"} height={500} width={500}></Image>
            </div>

            <div className="w-2/3">
                <div className="flex justify-end mb-20">
                    <Link
                        href={`/edit_record/${record._id}`}
                        className="inline-flex items-center px-3 py-3 border border-blue-800 text-md text-blue-800 rounded-md hover:bg-blue-800 hover:text-gray-100 mr-4">
                        Edit Record
                        <HiPencilAlt className="ml-2" size={24} />
                    </Link>
                    <RemoveBtn
                        id={record._id} />
                </div>

                <div className="flex flex-col justify-start">
                    <h1>Record information:</h1>
                    <p>Shape: {record.shape}</p>
                    <p>Current Collection: {curr_coll}</p>
                    <p>Previous Collection: {prev_coll}</p>
                    <p>Provenance: {provenance}</p>
                    <p>Height: {height}</p>
                    <p>Diameter: {diameter}</p>
                    <p>Plate: {plate}</p>
                    <p>Publication: {publication}</p>
                    <p>Description: {description}</p>
                </div>
            </div>
        </div>
    );
}