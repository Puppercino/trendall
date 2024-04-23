"use client";
import React, { useState } from 'react';
import RecordList from "@/app/components/RecordList";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";


// Attribute
const Attribute = ({ name }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="flex flex-col">
            <button
                onClick={() => setIsEditing(!isEditing)}
                className="mb-2 rounded border-2 p-2 text-left">
                {name}
            </button>
            {isEditing && (
                <input
                    type="text"
                    placeholder={`Enter Attribute ${name}`}
                    className="mb-2 rounded border-2 p-2"
                    onBlur={() => setIsEditing(false)} />
            )}
        </div>
    );
};


export default function SearchPage() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(searchTerm.toString());
        const res = await fetch(`/api/search?term=${searchTerm.toString()}`);
        console.log(res)
        const data = await res.json();
        setSearchResults(data);
    };

    const termInputHandler = async (e) => {
        setSearchTerm(e.target.value);
        console.log(searchTerm)
    }

    return (
        <div className="container mx-auto p-4">

            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">

                {/* Search container */}
                <div className="flex w-full flex-col gap-4 lg:w-1/3">

                    {/* Search bar */}
                    <form onSubmit={handleSearch}>
                        <div className="flex overflow-hidden rounded border-2">
                            <input
                                value={searchTerm}
                                onChange={termInputHandler}
                                className="flex-1 p-2"
                                type="text"
                                placeholder="General search term..."
                            />
                            <button type="submit" className="bg-gray-200 p-2">
                                <FiSearch size={24} />
                            </button>
                        </div>
                    </form>

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
                        <Link className="w-fit rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-600"
                            href={'/record'}>
                            Show all records
                        </Link>
                    </div>

                    {/* Change limit here */}
                    <RecordList records={searchResults} limit={20} />
                </div>

            </div>

            <div className="flex justify-end">
                <Link className="w-fit rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-600"
                    href={'/record'}>
                    Show all records
                </Link>
            </div>

        </div>

    );
}