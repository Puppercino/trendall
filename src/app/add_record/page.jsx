"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddRecord() {

    const [refNo, setRefNo] = useState(''); // TODO: change refNo, shape 
    const [shape, setShape] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!refNo || !shape) {
            alert('Please fill in all fields!');
            return;
        }

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ref_no: refNo, shape: shape }) // TODO: change refNo, shape
            });

            if (!res.ok) {
                throw new Error('Failed to create record');
            }

            router.push('/search'); // Navigate to search screen
            router.refresh();

        } catch (error) {
            console.error(error);
        }
    }

    return (<form onSubmit={handleSubmit}>
        <input className="border border-slate-500 px-8 py-2"
            type="text"
            placeholder="Record title"
            onChange={(e) => setRefNo(e.target.value)}
            value={refNo} />

        <input className="border border-slate-500 px-8 py-2"
            type="text"
            placeholder="Record desc"
            onChange={(e) => setShape(e.target.value)}
            value={shape} />

        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-fit"
            type="submit">
            Add record
        </button>
    </form>)
}