const Sinker = require('../models/sinker');

// Get all sinkers
exports.getAllSinkers = async (req, res) => {
  try {
    const sinkers = await Sinker.find();
    res.json(sinkers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a specific sinker by ID
exports.getSinkerById = async (req, res) => {
  const { id } = req.params;
  try {
    const sinker = await Sinker.findById(id);
    if (!sinker) {
      return res.status(404).json({ message: 'Sinker not found' });
    }
    res.json(sinker);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new sinker
exports.createSinker = async (req, res) => {
  console.log('creating sinker!')
  const { type, shape } = req.body;
  console.log({body: req.body});
  try {
    const newSinker = await Sinker.create({ type, shape });
    console.log({newSinker});
    res.status(201).json(newSinker);
  } catch (error) {
    console.log({error});
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an existing sinker by ID
exports.updateSinker = async (req, res) => {
  const { id } = req.params;
  const { type, shape } = req.body;
  try {
    const updatedSinker = await Sinker.findByIdAndUpdate(
      id,
      { type, shape },
      { new: true }
    );
    if (!updatedSinker) {
      return res.status(404).json({ message: 'Sinker not found' });
    }
    res.json(updatedSinker);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a sinker by ID
exports.deleteSinker = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSinker = await Sinker.findByIdAndDelete(id);
    if (!deletedSinker) {
      return res.status(404).json({ message: 'Sinker not found' });
    }
    res.json({ message: 'Sinker deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};