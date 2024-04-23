import React, { useState } from 'react';
import RecordListSearchPage from "@/app/components/RecordList";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

// Attribute
const Attribute = ({ number }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="flex flex-col">
            <button
                onClick={() => setIsEditing(!isEditing)}
                className="mb-2 rounded border-2 p-2 text-left">
                Attribute {number}
            </button>
            {isEditing && (
                <input
                    type="text"
                    placeholder={`Enter Attribute ${number}`}
                    className="mb-2 rounded border-2 p-2"
                    onBlur={() => setIsEditing(false)} />
            )}
        </div>
    );
};

export default function SearchPage() {
    return (
        <div className="container mx-auto p-4">

            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">

                {/* Search container */}
                <div className="flex w-full flex-col gap-4 lg:w-1/3">

                    {/* Search bar */}
                    <div className="flex overflow-hidden rounded border-2">
                        <input
                            className="flex-1 p-2"
                            type="text"
                            placeholder="Search records..."
                        />
                        <button className="bg-gray-200 p-2">
                            <FiSearch size={24} />
                        </button>
                    </div>

                    {/* Attribute Box */}
                    <div className="flex flex-col gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Attribute key={i} number={i + 1} />
                        ))}
                    </div>

                </div>

                {/* Result container */}
                <div className="w-full lg:ml-4 lg:w-2/3">
                    {/* <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        href={'/add_record'}>
                        Temporary add record button, might delete later
                    </Link> */}
                    <div className="flex justify-start">
                        <button className="w-fit rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-600"
                            type="button">
                            Show all records
                        </button>
                    </div>

                    <RecordListSearchPage />
                </div>

            </div>

            <div className="flex justify-end">
                <button className="w-fit rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-600"
                    type="button">
                    Show all records
                </button>
            </div>

        </div>

    );
}