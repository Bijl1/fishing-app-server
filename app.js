const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors(true));
app.use(express.json());

mongoose.connect('mongodb://localhost:4200/fishing-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  debug: true
})
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Routes
const luresRoutes = require('./routes/lures.routes');
const linesRoutes = require('./routes/lines.routes');
const sinkersRoutes = require('./routes/sinkers.routes');
app.use('/lures', luresRoutes);
app.use('/lines', linesRoutes);
app.use('/sinkers', sinkersRoutes);

// Error handling middleware (centralized error handling)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
