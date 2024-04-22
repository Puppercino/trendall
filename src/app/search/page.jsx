"use client"
import React, { useState } from 'react';

// Attribute
const Attribute = ({ number }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="border-2 p-2 rounded mb-2 text-left"
      >
        Attribute {number}
      </button>
      {isEditing && (
        <input
          type="text"
          placeholder={`Enter Attribute ${number}`}
          className="border-2 p-2 rounded mb-2"
          onBlur={() => setIsEditing(false)} // end editing when focus is lost
        />
      )}
    </div>
  );
};

export default function SearchPage() {
    return (
      <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        {/* Search */}
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex border-2 rounded overflow-hidden">
            <input
              className="p-2 flex-1"
              type="text"
              placeholder="search text"
            />
            <button className="bg-gray-200 p-2">
              🔍
            </button>
          </div>

          {/* Attribute Box */}
          <div className="flex flex-col gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Attribute key={i} number={i + 1} />
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="flex-1 lg:ml-4">
          <div className="flex gap-2 mb-4">
            <button className="py-1 px-4 bg-blue-500 text-white rounded">
              Text
            </button>
            <button className="py-1 px-4 bg-gray-200 rounded">
              Image
            </button>
          </div>

          {/* Result List */}
          <div className="border-t-2 pt-2 space-y-4">
            <div>
              <p className="font-bold">Result 1</p>
              <p>Introduction</p>
            </div>
            <div className="border-t-2 pt-2">
              <p className="font-bold">Result 2</p>
              <p>Introduction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}