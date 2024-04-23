"use client"

import React, { useState } from 'react';
import RecordListSearchPage from "@/app/components/RecordListSearchPage";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

// Attribute
const Attribute = ({ name }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="flex flex-col">
            <button
                onClick={() => setIsEditing(!isEditing)}
                className="border-2 p-2 rounded mb-2 text-left">
                {name}
            </button>
            {isEditing && (
                <input
                    type="text"
                    placeholder={`Enter Attribute ${name}`}
                    className="border-2 p-2 rounded mb-2"
                    onBlur={() => setIsEditing(false)} />
            )}
        </div>
    );
};

export default function SearchPage() {
    return (
        <div className="container mx-auto p-4">

            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

                {/* Search container */}
                <div className="flex flex-col gap-4 w-full lg:w-1/3">

                    {/* Search bar */}
                    <div className="flex border-2 rounded overflow-hidden">
                        <input
                            className="p-2 flex-1"
                            type="text"
                            placeholder="General search term..."
                        />
                        <button className="bg-gray-200 p-2">
                            <FiSearch size={24} />
                        </button>
                    </div>

                    {/* Attribute Box */}
                    <div className="flex flex-col gap-4">
                        {["Shape", "Collection", "Provenance", "With images"].map((item, i) => (
                            <Attribute key={i} name={item} />
                        ))}
                    </div>

                </div>

                {/* Result container */}
                <div className="lg:ml-4 w-full lg:w-2/3">
                    {/* <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        href={'/add_record'}>
                        Temporary add record button, might delete later
                    </Link> */}
                    <div className="flex justify-start">
                        <Link className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-fit"
                            href={'/record'}>
                            Show all records
                        </Link>
                    </div>

                    <RecordListSearchPage />
                </div>

            </div>

            <div className="flex justify-end">
                <Link className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-fit"
                    href={'/record'}>
                    Show all records
                </Link>
            </div>

        </div>

    );
}