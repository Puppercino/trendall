import dbConnection from "@/app/api/db/db";
import Record from "../../model/record_model";
import { NextResponse } from "next/server";

// Retrieve a record
export async function GET(req, { params }) {
    const { id } = params;
    await dbConnection();
    const record = await Record.findById(id);

    if (!record) {
        return NextResponse.json({ message: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ record }, { status: 200 });
}

// Update a record
export async function PUT(req, { params }) {
    const { id } = params;
    const { new_ref: ref_no, new_shape: shape } = await req.json(); // TODO: change new_ref, new_shape
    await dbConnection();
    const record = await Record.findByIdAndUpdate(id, { ref_no, shape });

    if (!record) {
        return NextResponse.json({ message: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Record updated" }, { status: 200 });
}

// Delete a record
export async function DELETE(req, { params }) {
    const { id } = params;
    await dbConnection();
    const record = await Record.findByIdAndDelete(id);

    if (!record) {
        return NextResponse.json({ message: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Record deleted" }, { status: 200 });
}

