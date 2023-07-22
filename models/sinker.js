const mongoose = require('mongoose');

const sinkerSchema = new mongoose.Schema({
  type: {
    type: Number,
    required: true,
  },
  shape: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Sinker', sinkerSchema);