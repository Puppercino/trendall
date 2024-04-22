import dbConnection from "@/app/api/db/db";
import Record from "../model/record_model";
import { NextResponse } from "next/server";

// Create a new record
export async function POST(req) {
    const { ref_no, shape } = await req.json();
    await dbConnection();
    await Record.create({ ref_no, shape });
    return NextResponse.json({ message: "Record created" }, { status: 201 });
}

// Retrieve all records
export async function GET() {
    await dbConnection();
    const records = await Record.find();
    return NextResponse.json({ records }, { status: 200 });
}