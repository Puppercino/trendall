"use client"

import React, { useState } from 'react';
import RecordList from "@/app/components/RecordList";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

// Attribute
const Attribute = ({ number }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="flex flex-col">
            <button
                onClick={() => setIsEditing(!isEditing)}
                className="border-2 p-2 rounded mb-2 text-left">
                Attribute {number}
            </button>
            {isEditing && (
                <input
                    type="text"
                    placeholder={`Enter Attribute ${number}`}
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
                            placeholder="Search text"
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
                <div className="lg:ml-4 w-full lg:w-2/3">
                    {/* <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        href={'/add_record'}>
                        Temporary add record button, might delete later
                    </Link> */}
                    {/* Result list */}
                    {/* <div className="pt-2 space-y-4">
                        <div className="border-b-2 pb-4">
                            <p className="font-bold">Result 1</p>
                            <p>Introduction</p>
                        </div>

                        <div className="border-b-2 pb-4">
                            <p className="font-bold">Result 2</p>
                            <p>Introduction</p>
                        </div>
                    </div> */}
                    <RecordList />
                </div>

            </div>

        </div>
    );
}