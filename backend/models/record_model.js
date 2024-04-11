const mongoose = require('mongoose');

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
  }
}, { timestamps: true });

module.exports = mongoose.model('Record', recordSchema);