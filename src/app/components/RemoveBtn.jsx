"use client";

import { HiOutlineTrash } from "react-icons/hi"
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {

    const router = useRouter();

    const removeRecord = async () => {
        const confirmed = confirm('Are you sure you want to delete this record?');

        if (confirmed) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete record');
            }

            router.refresh();
        }
    };

    return (
        <button className="inline-flex items-center px-3 py-3 border border-red-500 text-red-500 text-md font-medium rounded-md hover:bg-red-500 hover:text-gray-100"
            onClick={removeRecord}>
            Delete Record
            <HiOutlineTrash className="ml-2" size={24} />
        </button>
    )
}