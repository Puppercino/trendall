"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditRecordForm({ id, ref_no, shape, curr_coll, prev_coll, provenance,
    height, diameter, plate, publication, description }) {

    const [newRefNo, setNewRefNo] = useState(ref_no);
    const [newShape, setNewShape] = useState(shape);
    const [newCurrColl, setNewCurrColl] = useState(curr_coll);
    const [newPrevColl, setNewPrevColl] = useState(prev_coll);
    const [newProvenance, setNewProvenance] = useState(provenance);
    const [newHeight, setNewHeight] = useState(height);
    const [newDiameter, setNewDiameter] = useState(diameter);
    const [newPlate, setNewPlate] = useState(plate);
    const [newPublication, setNewPublication] = useState(publication);
    const [newDescription, setNewDescription] = useState(description);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newRefNo || !newShape) { // Can be changed
            alert('Please fill in required fields!');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    new_ref: newRefNo,
                    new_shape: newShape,
                    new_curr_coll: newCurrColl,
                    new_prev_coll: newPrevColl,
                    new_provenance: newProvenance,
                    new_height: newHeight,
                    new_diameter: newDiameter,
                    new_plate: newPlate,
                    new_publication: newPublication,
                    new_description: newDescription,
                })
            });

            if (!res.ok) {
                throw new Error('Failed to update record');
            }

            router.push(`/record/${id}`); // Navigate to record page screen
            router.refresh();

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>

            <div className="flex flex-col">
                <label className="mb-2" htmlFor="refNo">
                    Reference Number <span style={{ color: 'red' }}>*</span>
                </label>
                <input className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Record title"
                    onChange={(e) => setNewRefNo(e.target.value)}
                    value={newRefNo}
                    required />
            </div>

            <div className="flex flex-col">
                <label className="mb-2" htmlFor="shape">
                    Shape <span style={{ color: 'red' }}>*</span>
                </label>
                <input className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Record desc"
                    onChange={(e) => setNewShape(e.target.value)}
                    value={newShape}
                    required />
            </div>

            <div className="flex flex-col">
                <label htmlFor="currColl" className="mb-2">Current Collection</label>
                <input className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Current collection"
                    onChange={(e) => setNewCurrColl(e.target.value)}
                    value={newCurrColl} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="prevColl" className="mb-2">Previous Collection</label>
                <input className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Previous collection"
                    onChange={(e) => setNewPrevColl(e.target.value)}
                    value={newPrevColl} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="provenance" className="mb-2">Provenance</label>
                <input className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Provenance"
                    onChange={(e) => setNewProvenance(e.target.value)}
                    value={newProvenance} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="height" className="mb-2">Height</label>
                <input className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Height"
                    onChange={(e) => setNewHeight(e.target.value)}
                    value={newHeight} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="diameter" className="mb-2">Diameter</label>
                <input className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Diameter"
                    onChange={(e) => setNewDiameter(e.target.value)}
                    value={newDiameter} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="plate" className="mb-2">Plate</label>
                <input className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Plate"
                    onChange={(e) => setNewPlate(e.target.value)}
                    value={newPlate} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="publication" className="mb-2">Publication</label>
                <input className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Publication"
                    onChange={(e) => setNewPublication(e.target.value)}
                    value={newPublication} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="description" className="mb-2">Description</label>
                <input className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Description"
                    onChange={(e) => setNewDescription(e.target.value)}
                    value={newDescription} />
            </div>

            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-fit">
                Update record
            </button>

        </form>
    )
}