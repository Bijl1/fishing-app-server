const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const config = require('./config');
const luresRoutes = require('./routes/lures.routes');
const linesRoutes = require('./routes/lines.routes');
const sinkersRoutes = require('./routes/sinkers.routes');

const { authenticateUser } = require('./middleware/auth'); // Import the authenticateUser middleware

app.use(cors(true));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/fishing-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to the database!');
})
.catch((error) => {
  console.error('Error connecting to the database:', error);
});

app.use('/lures', authenticateUser, luresRoutes); // Apply authenticateUser middleware to protect lures routes
app.use('/lines', authenticateUser, linesRoutes); // Apply authenticateUser middleware to protect lines routes
app.use('/sinkers', authenticateUser, sinkersRoutes); // Apply authenticateUser middleware to protect sinkers routes

// Error handling middleware (centralized error handling)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
