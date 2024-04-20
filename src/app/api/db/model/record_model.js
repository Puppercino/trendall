import mongoose from 'mongoose';

// Record Schema for MongoDB, originally written by Vinh in Express.
const recordSchema = mongoose.Schema({
    ref_no: {
        type: Number,
        required: true
    },
    shape: {
        type: String,
        required: true
    },
    curr_coll: {
        type: String,
        required: false
    },
    prev_coll: {
        type: String,
        required: false
    },
    provenance: {
        type: String,
        required: false
    },
    height: {
        type: String,
        required: false
    },
    diameter: {
        type: String,
        required: false
    },
    plate: {
        type: String,
        required: false
    },
    publication: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
}, { timestamps: true });

const Record = mongoose.model("Record", recordSchema);

export default Record;