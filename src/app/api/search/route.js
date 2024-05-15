// pages/api/search.js
export const dynamic = "force-dynamic";
import { NextResponse, NextRequest } from "next/server";
import Record from "@/app/api/db/model/record_model";

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

export async function GET(req) {
    const { records } = await getRecords();
    const { searchParams } = new URL(req.url);
    const term = searchParams.get('term');
    const filteredRecords = records.filter((record) => {
        const fields = [
            record.shape,
            record.curr_coll,
            record.prev_coll,
            record.provenance,
            record.height,
            record.diameter,
            record.plate,
            record.publication,
            record.description
        ];
        return fields.some(field => field?.toLowerCase().includes(term.toLowerCase()));
    });
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