const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const User = require('../models/user');
const {isAuthenticated} = require('../middleware/auth');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    user = new User({ email, password });
    // Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    console.log({user, hashedPassword: user.password, })

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login route
router.post('/signin', async (req, res) => {
  console.log({signingUp: req.body})
  try {
    const { email, password } = req.body;

    // Check if the user exists
    let user = await User.findOne({ email });
    console.log({user, body: req.body});
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log({isMatch});
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const payload = {
      ...user,
    };
    const authToken = jwt.sign(payload, config.jwtSecret, { algorithm: "HS256", expiresIn: '1h' }, (err, token) => {
        console.log({err, token, payload, isMatch, user});
      if (err) throw err;
      res.json({ token: authToken, user });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get('/verify', isAuthenticated, (req, res, next) => {       // <== CREATE NEW ROUTE
  console.log({verify: req.headers});
    // If JWT token is valid the payload gets decoded by the
    // isAuthenticated middleware and made available on `req.payload`
    console.log(`req.payload`, req.payload);
   
    // Send back the object with user data
    // previously set as the token payload
    res.status(200).json(req.payload);
  });

module.exports = router;
