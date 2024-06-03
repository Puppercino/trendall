/*
Authors: Jordan Lyall, Trong Vinh Luu
*/

import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
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

    const session = await getServerSession(options);
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
            <div className="mr-10 w-1/3">
                <Image className={"mr-4 rounded-l"} src={recordImage} alt={"Vase image"} height={500} width={500}></Image>
            </div>

            <div className="w-2/3">
                {session && (
                    <div className="flex justify-end">
                        <Link
                            href={`/edit_record/${record._id}`}
                            className="text-md mr-4 inline-flex items-center rounded-md border border-blue-800 p-3 text-blue-800 hover:bg-blue-800 hover:text-gray-100">
                            Edit Record
                            <HiPencilAlt className="ml-2" size={24} />
                        </Link>
                        <RemoveBtn id={record._id} />
                    </div>
                )}

                <div className="flex h-full flex-col justify-center">
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