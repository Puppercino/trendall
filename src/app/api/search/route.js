export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import Record from "@/app/api/db/model/record_model";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const term = searchParams.get('term');
    const image = searchParams.get('image');

    let filterConditions = {};

    if (term) {
        console.log("Search API: term ", term);
        const searchRegex = new RegExp(term, 'i'); // Case insensitive
        filterConditions.$and = [
            {
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
            }
        ];
    }

    if (image === 'true') {
        if (!filterConditions.$and) {
            filterConditions.$and = [];
        }
        filterConditions.$and.push({ image: { $ne: null } });
    }

    const records = await Record.find(filterConditions);
    return NextResponse.json(records);
};