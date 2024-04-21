"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditRecordForm({ id, ref_no, shape }) {

    const [newRefNo, setNewRefNo] = useState(ref_no);
    const [newShape, setNewShape] = useState(shape);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/db/routes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ new_ref: newRefNo, new_shape: newShape }) // TODO: change refNo, shape
            });

            if (!res.ok) {
                throw new Error('Failed to update record');
            }

            router.push('/'); // Navigate to home screen
            router.refresh();

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Record title"
                onChange={(e) => setNewRefNo(e.target.value)}
                value={newRefNo} />

            <input className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Record desc"
                onChange={(e) => setNewShape(e.target.value)}
                value={newShape} />

            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-fit">
                Update record
            </button>
        </form>
    )
}