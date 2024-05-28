"use client";

import React, { useState, useEffect } from 'react';
import RecordList from "@/app/components/RecordList";
import { FiSearch } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import Link from "next/link";

const getRecords = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
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
                className={`flex items-center justify-between border-2 p-2 text-left ${isEditing ? "rounded-t" : "rounded"}`}
                onClick={() => {
                    setIsEditing(!isEditing);
                    if (!isEditing) {
                        setShowAll(false);
                    }
                    if (name === 'With Images') {
                        setFilteredAttr(prevFilters => addFilter(prevFilters, 'With Images'));
                    }
                }}>
                {name}
                {name !== "With Images" && <span>{isEditing ? '▼' : '►'}</span>}
            </button>
            {isEditing && name !== "With Images" && (
                <>
                    {/* <input
                        type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={`Enter ${name}`}
                        className="mb-1 rounded border-2 p-2"
                        onBlur={handleBlur}
                    /> */}
                    <div className="border-2 rounded-b p-1 pl-2">
                        {(showAll ? attribute : attribute.slice(0, 10)).map((record, index) => (
                            <button
                                className="w-full border-b-2 p-1 text-left hover:bg-blue-200"
                                type='button'
                                key={index}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setFilteredAttr(prevFilters => addFilter(prevFilters, record));
                                }}>
                                {record}
                            </button>
                        ))}
                        <button
                            className="w-full p-1 text-left text-blue-500 underline hover:bg-blue-200"
                            onClick={handleListAll} >
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
        console.log("Now fetching: /api/search?term=" + searchTerm);
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
                    className="flex-1 p-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="General search term..."
                />
                <button className="bg-blue-500 p-2 text-white" type="submit">
                    <FiSearch size={24} />
                </button>
            </div>
        </form>
    );
};

export default function SearchPage() {

    const [limit, setLimit] = useState(30); // Limit the number of records displayed
    const [searchResults, setSearchResults] = useState([]);
    const [filteredAttr, setFilteredAttr] = useState([]);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [records, setRecords] = useState([]);

    // Get initial set of records and dropdown options from API.
    useEffect(() => {
        const fetchRecords = async () => {
            const res = await getRecords();
            // setRecords(res.records);
            setDropdownOptions(res.records);
        };

        fetchRecords();
    }, []);


    const hasImageFilter = filteredAttr.some(filter => filter.name === 'With Images');
    const searchTerm = filteredAttr.filter(filter => filter.name !== 'With Images').map(filter => filter.name).join('&');
    // Activates filters applied from the dropdown.
    // TODO: Likely causes complete crash the entire production server somehow. Investigate.
    useEffect(() => {
        console.log("Now checking for image with: /api/search?term=" + searchTerm);
        const fetchUrl = `/api/search?term=${searchTerm}${hasImageFilter ? '&image=true' : ''}`;

        const getFilterResults = async () => {
            try {
                console.log("Fetching: " + fetchUrl)
                const res = await fetch(fetchUrl);
                if (res.ok) {
                    const data = await res.json();
                    setRecords(data);
                } else {
                    console.error('Failed to fetch records');
                }
            } catch (error) {
                console.error(error);
            }
        };
        getFilterResults();       // This breaks search for now.
    }, [filteredAttr]);


    const attrs = ["Shape", "Current Collection", "Previous Collection", "Provenance", "With Images"];
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
            default:
                return [];
        }
    };

    const handleValueChange = (value) => {
        // TODO: reset state if value is empty
        const newDropdownOptions = dropdownOptions.filter(option => option.shape.toLowerCase().includes(value.toLowerCase()));
        setDropdownOptions(newDropdownOptions);
    };

    const handleDeleteFilter = (value) => {
        setFilteredAttr(prevFilters => prevFilters.filter((_, i) => i !== value));
    };

    return (
        <div className="container mx-auto p-4">

            <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">

                {/* Left column for search and attribute filters */}
                <div className="flex w-full flex-col gap-3 lg:w-1/3">

                    <div className='flex flex-row'>
                        <span className="mr-2 font-bold">Filter:</span>

                        {/* Filter item */}
                        {filteredAttr.map((filter, index) => (
                            <div className="mr-2 flex items-center space-x-2" key={index} >
                                <span>{filter.name}</span>
                                <button onClick={() => handleDeleteFilter(index)}>
                                    <TiDelete color='red' size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Search bar */}
                    <SearchBar getRecordResults={(results) => setRecords(results)} />

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
                </div>

            </div>
            <div className="flex justify-end">
                <button
                    className="p-1 text-left text-blue-500 hover:text-blue-600 hover:underline"
                    onClick={(e) => {
                        setLimit(limit + 30);
                    }}>
                    More records...
                </button>
            </div>
        </div>
    );
}