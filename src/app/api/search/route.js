// pages/api/search.js
export const dynamic = "force-dynamic";
import { NextResponse, NextRequest } from "next/server";
import Record from "@/app/api/db/model/record_model";


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const term = searchParams.get('term');

    if (!term) {
        const records = await Record.find();
        return NextResponse.json(records);
    }

    const searchRegex = new RegExp(term, 'i'); // 'i' 表示不区分大小写
    const filterConditions = {
        $or: [
            { shape: { $regex: searchRegex } },
            { curr_coll: { $regex: searchRegex } },
            { prev_coll: { $regex: searchRegex } },
            { provenance: { $regex: searchRegex } },
            { height: { $regex: searchRegex } },
            { diameter: { $regex: searchRegex } },
            { plate: { $regex: searchRegex } },
            { publication: { $regex: searchRegex } },
            { description: { $regex: searchRegex } }
        ]
    };

    const filteredRecords = await Record.find(filterConditions);
    return NextResponse.json(filteredRecords);
};

// export async function GET(req) {
//     console.log("QUERY: " + req.url)
//     const { searchParams } = new URL(req.url)
//     const term = searchParams.get('term');
//     console.log("TERM: " + term)

//     const records = await Record.find({ $text: { $search: term } });

//     console.log("Found: " + records)

//     NextResponse.json(records);
// }