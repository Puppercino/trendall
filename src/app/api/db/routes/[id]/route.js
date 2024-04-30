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
    const { new_ref: ref_no, new_shape: shape, new_curr_coll: curr_coll, new_prev_coll: prev_coll, new_provenance: provenance,
        new_height: height, new_diameter: diameter, new_plate: plate, new_publication: publication, new_description: description } = await req.json(); // TODO: change new_ref, new_shape
    await dbConnection();
    const record = await Record.findByIdAndUpdate(id, {
        ref_no, shape, curr_coll, prev_coll, provenance,
        height, diameter, plate, publication, description
    });

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

