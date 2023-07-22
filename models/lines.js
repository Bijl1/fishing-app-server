const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
  tencelStr: {
    type: String,
    required: true,
  },
  gauge: {
    type: Number,
    required: true,
  },
  knotType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Line', lineSchema);