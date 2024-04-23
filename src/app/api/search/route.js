// pages/api/search.js
import {getAllRecords} from "@/app/api/db/controller/record_controller";
import { NextResponse, NextRequest } from "next/server";
import Record from "@/app/api/db/model/record_model";

export async function GET(req) {
    console.log("QUERY: " + req.url)
    const { searchParams } = new URL(req.url)
    const term = searchParams.get('term');
    console.log("TERM: " + term)

    const records = await Record.find({ $text: { $search: term } });

    console.log("Found: " + records)

    NextResponse.json(records);
}