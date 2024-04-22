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
        <button className="text-red-400"
            onClick={removeRecord}>
            <HiOutlineTrash size={24} />
        </button>
    )
}