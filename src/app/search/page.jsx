"use client";
import React, { useState } from 'react';
import RecordList from "@/app/components/RecordList";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

// Attribute
const Attribute = ({ name, onValueChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState('');

    const handleBlur = () => {
        setIsEditing(false);
        onValueChange(value);
    };

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
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={`Enter Attribute ${name}`}
                    className="mb-2 rounded border-2 p-2"
                    onBlur={handleBlur} />
            )}
        </div>
    );
};

export default function SearchPage() {
    const [searchResults, setSearchResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/search?term=${searchTerm}`);
        const data = await res.json();
        setSearchResults(data);
    };

    const termInputHandler = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleValueChange = (value) => {
        const newFilteredResults = searchResults.filter(result => result.attributes.includes(value));
        setFilteredResults(newFilteredResults);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                <div className="flex w-full flex-col gap-4 lg:w-1/3">
                    <form onSubmit={handleSearch}>
                        <div className="flex overflow-hidden rounded border-2">
                            <input
                                value={searchTerm}
                                onChange={termInputHandler}
                                className="flex-1 p-2"
                                type="text"
                                placeholder="General search term..." />
                            <button type="submit" className="bg-blue-500 text-white p-2">Search</button>
                        </div>
                    </form>
                    {["Shape", "Collection", "Provenance", "With images"].map((item, i) => (
                        <Attribute key={i} name={item} onValueChange={handleValueChange} />
                    ))}
                </div>
                <div className="w-full lg:ml-4 lg:w-2/3">
                    <div className="flex justify-start">
                        <Link className="w-fit rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-600"
                            href={'/record'}>
                            Show all records
                        </Link>
                    </div>
                    <RecordList records={filteredResults.length > 0 ? filteredResults : searchResults} limit={20} />
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