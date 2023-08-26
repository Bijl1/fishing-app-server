// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// // app.use(cors(true));
// app.use(express.json());

// // Connect to MongoDB using Mongoose
// mongoose.connect('mongodb://localhost/fishing_app', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => console.error('MongoDB connection error:', error));

// // Define and use your routes here (CRUD operations for Lure, Line, and Combo models)

// const PORT = process.env.PORT || 4200;
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });