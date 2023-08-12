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

// Hash the password before saving it to the database
// userSchema.pre('save', async function (next) {
//   try {
//     if (!this.isModified('password')) {
//       return next();
//     }

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// Method to compare password for login
// userSchema.methods.comparePassword = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     throw error;
//   }
// };

// // Method to generate a JWT token for the user
// userSchema.methods.generateToken = function () {
//   const token = jwt.sign({ userId: this._id }, jwtSecret, { expiresIn: '1h' });
//   return token;
// };

module.exports = mongoose.model('User', userSchema);