"use client";

import React, { useState } from 'react';
import RecordListSearchPage from "@/app/components/RecordList";
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

            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">

                {/* Search container */}
                <div className="flex w-full flex-col gap-4 lg:w-1/3">

                    {/* Search bar */}
                    <div className="flex overflow-hidden rounded border-2">
                        <input
                            className="flex-1 p-2"
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
                <div className="w-full lg:ml-4 lg:w-2/3">
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

                    {/* Change limit here */}
                    <RecordListSearchPage limit={20} />
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