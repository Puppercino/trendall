export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import Record from "@/app/api/db/model/record_model";


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const term = searchParams.get('term');

    if (!term) {
        const records = await Record.find();
        return NextResponse.json(records);
    }

    const searchRegex = new RegExp(term, 'i'); // Case insensitive
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