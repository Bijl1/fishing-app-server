const mongoose = require('mongoose');

const lureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lureType: {
    type: String,
    enum: ['TopWater', 'fly', 'silver'],
    required: true,
  },
  bestUsedFor: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Lure', lureSchema);