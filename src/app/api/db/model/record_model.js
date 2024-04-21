import mongoose, {Schema} from 'mongoose';
import dbConnection from "@/app/api/db/db";


// Record Schema for MongoDB, originally written by Vinh in Express.
const recordSchema = new Schema({
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

function initRecord() {
    try {
        // Trying to get the existing model to avoid overwriting
        return mongoose.model('Record');
    } catch {
        // Model doesn't exist, make a new one
        return mongoose.model('Record', recordSchema, 'records');
    }

}

let Record = initRecord();
dbConnection().then(() => initRecord());

export default Record;