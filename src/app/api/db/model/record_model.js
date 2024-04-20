import mongoose, {Schema} from 'mongoose';

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

let Record;

try {
    // Trying to get the existing model to avoid overwriting
    Record = mongoose.model('Record');
} catch {
    // Model doesn't exist, make a new one
    Record = mongoose.model('Record', recordSchema);
}

export default Record;