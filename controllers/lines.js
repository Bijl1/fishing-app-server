const Line = require('../models/lines');

// Get all lines
exports.getAllLines = async (req, res) => {
  try {
    const lines = await Line.find();
    res.json(lines);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a specific line by ID
exports.getLineById = async (req, res) => {
  const { id } = req.params;
  try {
    const line = await Line.findById(id);
    if (!line) {
      return res.status(404).json({ message: 'Line not found' });
    }
    res.json(line);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new line
exports.createLine = async (req, res) => {
  const { tencelStr, gauge, knotType } = req.body;
  try {
    const newLine = await Line.create({ tencelStr, gauge, knotType });
    res.status(201).json(newLine);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an existing line by ID
exports.updateLine = async (req, res) => {
  const { id } = req.params;
  const { tencelStr, gauge, knotType } = req.body;
  try {
    const updatedLine = await Line.findByIdAndUpdate(
      id,
      { tencelStr, gauge, knotType },
      { new: true }
    );
    if (!updatedLine) {
      return res.status(404).json({ message: 'Line not found' });
    }
    res.json(updatedLine);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a line by ID
exports.deleteLine = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLine = await Line.findByIdAndDelete(id);
    if (!deletedLine) {
      return res.status(404).json({ message: 'Line not found' });
    }
    res.json({ message: 'Line deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
