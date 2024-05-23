"use client";

import React, { useState, useEffect } from 'react';
import RecordList from "@/app/components/RecordList";
import { FiSearch } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import Link from "next/link";

const getRecords = async () => {
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
            cache: 'no-store',
        });

        if (!res.ok) {
            throw new Error('Failed to fetch records')
        }

        return res.json();

    } catch (error) {
        console.error(error)
    }
};

// Attribute
const Attribute = ({ attribute, name, onValueChange, setFilteredAttr }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState('');
    const [showAll, setShowAll] = useState(false);

    const handleBlur = () => {
        setIsEditing(false);
        onValueChange(value);
    };

    const handleListAll = () => {
        setShowAll(prevShowAll => !prevShowAll);
    };

    const addFilter = (prevFilters, record) => {
        const filterExists = prevFilters.some(filter => filter.name === record);
        if (!filterExists) {
            return [...prevFilters, { name: record }];
        }
        return prevFilters;
    };

    return (
        <div className="flex flex-col">

            {/* Attribute dropdown button */}
            <button
                onClick={() => {
                    setIsEditing(!isEditing);
                    if (!isEditing) {
                        setShowAll(false);
                    }
                }}
                className="mb-2 rounded border-2 p-2 text-left flex justify-between items-center">
                {name}
                <span>{isEditing ? '▼' : '►'}</span>
            </button>
            {isEditing && (
                <>
                    <input
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={`Enter ${name}`}
                        className="mb-1 rounded border-2 p-2"
                        onBlur={handleBlur}
                    />
                    <div className="border-2 p-1 pl-2">
                        {(showAll ? attribute : attribute.slice(0, 10)).map((record, index) => (
                            <button
                                type='button'
                                key={index}
                                className="w-full text-left p-1 border-b-2 hover:bg-blue-200"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setFilteredAttr(prevFilters => addFilter(prevFilters, record));
                                }}>
                                {record}
                            </button>
                        ))}
                        <button onClick={handleListAll} className='w-full text-left text-blue-500 underline p-1 hover:bg-blue-200'>
                            {showAll ? 'Collapse' : 'List All'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const SearchBar = ({ getRecordResults }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/search?term=${searchTerm}`);
        if (res.ok) {
            const data = await res.json();
            getRecordResults(data);
        } else {
            console.error('Failed to fetch records');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex overflow-hidden rounded border-2">
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 p-2"
                    type="text"
                    placeholder="General search term..."
                />
                <button type="submit" className="bg-blue-500 text-white p-2">
                    <FiSearch size={24} />
                </button>
            </div>
        </form>
    );
};

export default function SearchPage() {

    const [limit, setLimit] = useState(30); // Limit the number of records displayed
    const [searchResults, setSearchResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAttr, setFilteredAttr] = useState([]);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            const res = await getRecords();
            setRecords(res.records);
            setDropdownOptions(res.records);
        };

        fetchRecords();
    }, []);

    const attrs = ["Shape", "Current Collection", "Previous Collection", "Provenance", "Height", "Diameter", "With images"];
    const attrDropdown = (item) => {
        switch (item) {
            case 'Shape':
                return [...new Set(dropdownOptions.map(record => {
                    const shape = record.shape;
                    if (shape) {
                        const index = shape.search(/\(/);
                        return index !== -1 ? shape.slice(0, index).trim() : shape;
                    }
                    return null;
                }))].filter(Boolean).sort();
            case 'Current Collection':
                return [...new Set(dropdownOptions.map(record => {
                    const coll = record.curr_coll;
                    if (coll) {
                        const index = coll.search(/\(|,|\d/);
                        return index !== -1 ? coll.slice(0, index).trim() : coll;
                    }
                    return null;
                }))].filter(Boolean).sort();
            case 'Previous Collection':
                return [...new Set(dropdownOptions.map(record => {
                    const coll = record.prev_coll;
                    if (coll) {
                        const index = coll.search(/\(|,|\d/);
                        return index !== -1 ? coll.slice(0, index).trim() : coll;
                    }
                    return null;
                }))].filter(Boolean).sort();
            case 'Provenance':
                return [...new Set(dropdownOptions.map(record => {
                    const prov = record.provenance;
                    if (prov) {
                        const index = prov.search(/\(|,|\d/);
                        return index !== -1 ? prov.slice(0, index).trim() : prov;
                    }
                    return null;
                }))].filter(Boolean).sort();
            // case 'Height':
            //     return [...new Set(records.map(record => record.height))].sort();
            // case 'Diameter':
            //     return [...new Set(records.map(record => record.diameter))].sort();
            // case 'With images':
            //     return [...new Set(records.map(record => record.images))].sort();
            default:
                return [];
        }
    };

    // const handleSearch = async (e) => {
    //     e.preventDefault();
    //     const res = await fetch(`/api/search?term=${searchTerm}`);
    //     const data = await res.json();
    //     setSearchResults(data);
    // };

    const termInputHandler = (term) => {
        setSearchTerm(term);
    }

    const handleValueChange = (value) => {
        const newFilteredResults = searchResults.filter(result => result.attributes.includes(value));
        setFilteredResults(newFilteredResults);
        setFilteredAttr(prevFilters => [...prevFilters, { name: value }]);
    };

    const handleDeleteFilter = (value) => {
        setFilteredAttr(prevFilters => prevFilters.filter((_, i) => i !== value));
    };

    return (
        <div className="container mx-auto p-4">

            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">

                {/* Left column for search and attribute filters */}
                <div className="flex w-full flex-col gap-4 lg:w-1/3">

                    <div className='flex flex-row'>
                        <span className="font-bold mr-2">Filter:</span>

                        {/* Filter item */}
                        {filteredAttr.map((filter, index) => (
                            <div key={index} className="flex items-center space-x-2 mr-2">
                                <span>{filter.name}</span>
                                <button onClick={() => handleDeleteFilter(index)}>
                                    <TiDelete color='red' size={20} />
                                </button>
                            </div>
                        ))}

                    </div>

                    {/* Searchbar */}
                    {/* <form onSubmit={handleSearch}>
                        <div className="flex overflow-hidden rounded border-2">
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 p-2"
                                type="text"
                                placeholder="General search term..." />
                            <button type="submit" className="bg-blue-500 text-white p-2">
                                <FiSearch size={24} />
                            </button>
                        </div>
                    </form> */}
                    <SearchBar
                        getRecordResults={(results) => setRecords(results)}
                    />

                    {/* Dropdown */}
                    {attrs.map((item, i) => (
                        <Attribute
                            key={i}
                            attribute={attrDropdown(item)}
                            name={item}
                            onValueChange={handleValueChange}
                            setFilteredAttr={setFilteredAttr} />
                    ))}

                </div>

                <div className="w-full lg:ml-4 lg:w-2/3">
                    <div className="flex justify-start">
                        <Link className="w-fit rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-600"
                            href={'/record'}>
                            Show all records
                        </Link>
                    </div>
                    <RecordList records={records} limit={limit} />
                    {/* <RecordList records={filteredResults.length > 0 ? filteredResults : searchResults} limit={20} /> */}
                </div>

            </div>
            <div className="flex justify-end">
                <button
                    onClick={(e) => {
                        // TODO: prevent reloading the page
                        setLimit(limit + 30);
                    }}
                    className='text-left text-blue-500 p-1 hover:underline hover:text-blue-600'>
                    More records...
                </button>
            </div>
        </div>
    );
}