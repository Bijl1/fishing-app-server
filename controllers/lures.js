const Lure = require('../models/lure');

// Get all lures
exports.getAllLures = async (req, res) => {
  try {
    const lures = await Lure.find();
    res.json(lures);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a specific lure by ID
exports.getLureById = async (req, res) => {
  const { id } = req.params;
  try {
    const lure = await Lure.findById(id);
    if (!lure) {
      return res.status(404).json({ message: 'Lure not found' });
    }
    res.json(lure);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new lure
exports.createLure = async (req, res) => {
  const { name, lureType, bestUsedFor } = req.body;
  try {
    const newLure = await Lure.create({ name, lureType, bestUsedFor });
    res.status(201).json(newLure);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update an existing lure by ID
exports.updateLure = async (req, res) => {
  const { id } = req.params;
  const { name, lureType, bestUsedFor } = req.body;
  try {
    const updatedLure = await Lure.findByIdAndUpdate(
      id,
      { name, lureType, bestUsedFor },
      { new: true }
    );
    if (!updatedLure) {
      return res.status(404).json({ message: 'Lure not found' });
    }
    res.json(updatedLure);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a lure by ID
exports.deleteLure = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLure = await Lure.findByIdAndDelete(id);
    if (!deletedLure) {
      return res.status(404).json({ message: 'Lure not found' });
    }
    res.json({ message: 'Lure deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};