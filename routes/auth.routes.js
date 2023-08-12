const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const User = require('../models/user');

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
  try {
    const { email, password } = req.body;

    // Check if the user exists
    let user = await User.findOne({ email });
    console.log({user});
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
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }, (err, token) => {
        console.log(err, token, payload, isMatch, user);
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;


// // User registration route
// router.post('/signup', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log({sihnupBody: req.body})

//     // Check if the email is already registered
//     const existingUser = await User.findOne({ email });
//     console.log({existingUser});

//     if (!!existingUser) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create a new user
//     const newUser = new User({ email, password: hashedPassword });
//     await newUser.save();
//     // const newUser = User.create({ email, password: hashedPassword });

//     console.log({newUser, password, hashedPassword});

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // User login route
// router.post('/signin', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log({body: req.body});

//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//         console.log('user not found')
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     console.log({user});

//     // Compare the password
//     const isMatch = await bcrypt.compare(password, user.password, (err, result) => {
//         console.log({err: result});
//     });
//     if (!isMatch) {
//         console.log('incorrect password')
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const payload = { user: { id: user.id } };
//     jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// module.exports = router;