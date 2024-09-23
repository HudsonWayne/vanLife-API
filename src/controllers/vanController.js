import express from 'express';
import Van from '../models/van.js'; // Adjust the path and file extension if necessary

const router = express.Router();

// Get all vans
const getAllVans = async (req, res) => {
  try {
    const vans = await Van.find();
    res.status(200).json(vans);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch vans', error });
  }
};

// Get a single van by ID
const getVanById = async (req, res) => {
  try {
    const van = await Van.findById(req.params.id);
    if (!van) {
      return res.status(404).json({ message: 'Van not found' });
    }
    res.status(200).json(van);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch van', error });
  }
};

// Create a new van
const createVan = async (req, res) => {
  try {
    const newVan = new Van(req.body);
    await newVan.save();
    res.status(201).json(newVan);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create van', error });
  }
};

// Update a van by ID
const updateVan = async (req, res) => {
  try {
    const van = await Van.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!van) {
      return res.status(404).json({ message: 'Van not found' });
    }
    res.status(200).json(van);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update van', error });
  }
};

// Delete a van by ID
const deleteVan = async (req, res) => {
  try {
    const van = await Van.findByIdAndDelete(req.params.id);
    if (!van) {
      return res.status(404).json({ message: 'Van not found' });
    }
    res.status(200).json({ message: 'Van deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete van', error });
  }
};

// Define routes
router.get('/vans', getAllVans);
router.get('/vans/:id', getVanById);
router.post('/vans', createVan);
router.put('/vans/:id', updateVan);
router.delete('/vans/:id', deleteVan);

export default router;
