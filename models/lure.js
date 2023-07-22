const mongoose = require('mongoose');

const lureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lureType: {
    type: [String],
    enum: ['type1', 'type2', 'type3'],
    required: true,
  },
  bestUsedFor: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Lure', lureSchema);