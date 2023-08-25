const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  combos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Combo' }],
});

module.exports = mongoose.model('User', userSchema);