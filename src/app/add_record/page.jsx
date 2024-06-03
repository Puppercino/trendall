/*
Authors: Trong Vinh Luu
*/

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddRecord() {

    const [refNo, setRefNo] = useState('');
    const [shape, setShape] = useState('');
    const [currColl, setCurrColl] = useState('');
    const [prevColl, setPrevColl] = useState('');
    const [provenance, setProvenance] = useState('');
    const [height, setHeight] = useState('');
    const [diameter, setDiameter] = useState('');
    const [plate, setPlate] = useState('');
    const [publication, setPublication] = useState('');
    const [description, setDescription] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!refNo || !shape) { // Can be changed
            alert('Please fill in required fields!');
            return;
        }

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ref_no: refNo, shape: shape, curr_coll: currColl, prev_coll: prevColl, provenance: provenance,
                    height: height, diameter: diameter, plate: plate, publication: publication, description: description
                })
            });

            if (!res.ok) {
                throw new Error('Failed to create record');
            }

            alert('Record successfully added');
            router.push('/record'); // Navigate to record screen
            router.refresh();

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

            <div className="flex flex-col">
                <label className="mb-2" htmlFor="refNo">
                    Reference Number <span style={{ color: 'red' }}>*</span>
                </label>
                <input className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Reference number"
                    onChange={(e) => setRefNo(e.target.value)}
                    value={refNo}
                    required />
            </div>

            <div className="flex flex-col">
                <label className="mb-2" htmlFor="shape">
                    Shape <span style={{ color: 'red' }}>*</span>
                </label>
                <input className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Shape"
                    onChange={(e) => setShape(e.target.value)}
                    value={shape}
                    required />
            </div>

            <div className="flex flex-col">
                <label htmlFor="currColl" className="mb-2">Current Collection</label>
                <input id="currColl" className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Current collection"
                    onChange={(e) => setCurrColl(e.target.value)}
                    value={currColl} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="prevColl" className="mb-2">Previous Collection</label>
                <input id="prevColl" className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Previous collection"
                    onChange={(e) => setPrevColl(e.target.value)}
                    value={prevColl} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="provenance" className="mb-2">Provenance</label>
                <input id="provenance" className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Provenance"
                    onChange={(e) => setProvenance(e.target.value)}
                    value={provenance} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="height" className="mb-2">Height</label>
                <input id="height" className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Height"
                    onChange={(e) => setHeight(e.target.value)}
                    value={height} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="diameter" className="mb-2">Diameter</label>
                <input id="diameter" className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Diameter"
                    onChange={(e) => setDiameter(e.target.value)}
                    value={diameter} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="plate" className="mb-2">Plate</label>
                <input id="plate" className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Plate"
                    onChange={(e) => setPlate(e.target.value)}
                    value={plate} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="publication" className="mb-2">Publication</label>
                <input id="publication" className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Publication"
                    onChange={(e) => setPublication(e.target.value)}
                    value={publication} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="description" className="mb-2">Description</label>
                <input id="description" className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description} />
            </div>

            <button className="w-fit rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                type="submit">
                Add record
            </button>

        </form>
    )
}