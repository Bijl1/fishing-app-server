const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');
const User = require('../models/user');

// User Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// User Signin
router.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = user.generateToken();
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error signing in', error: error.message });
    }
  });

// Protected Route (requires authentication)
router.get('/protected', (req, res) => {
  res.json({ message: 'Protected route accessed successfully' });
});

module.exports = router;