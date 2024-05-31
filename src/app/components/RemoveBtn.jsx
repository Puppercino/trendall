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

            alert('Record successfully deleted');
            router.push('/record'); // Navigate to record screen
            router.refresh();
        }
    };

    return (
        <button className="text-md inline-flex items-center rounded-md border border-red-500 p-3 font-medium text-red-500 hover:bg-red-500 hover:text-gray-100"
            onClick={removeRecord}>
            Delete Record
            <HiOutlineTrash className="ml-2" size={24} />
        </button>
    )
}