const mongoose = require('mongoose');

const vaseSchema = mongoose.Schema({
  refNo: {
    type: Number,
    required: true
  },
  currColl: {
    type: String,
    required: true
  },
  prevColl: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Vase', vaseSchema);