const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
  name: {            
    type: String,
    required: true,
  },
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
