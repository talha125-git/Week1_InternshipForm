const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// POST /api/registrations  -> save a new registration
router.post('/', async (req, res) => {
  try {
    const { name, email, technology } = req.body;

    if (!name || !email || !technology) {
      return res.status(400).json({
        message: 'Name, email, and technology are all required.',
      });
    }

    const registration = await Registration.create({ name, email, technology });
    return res.status(201).json(registration);
  } catch (error) {
    console.error('Error creating registration:', error.message);
    return res.status(500).json({
      message: 'Something went wrong while saving your registration.',
    });
  }
});

// GET /api/registrations  -> list all registrations, oldest first
router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: 1 });
    return res.status(200).json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error.message);
    return res.status(500).json({
      message: 'Something went wrong while fetching registrations.',
    });
  }
});

// PUT /api/registrations/:id  -> update a registration
router.put('/:id', async (req, res) => {
  try {
    const { name, email, technology } = req.body;

    if (!name || !email || !technology) {
      return res.status(400).json({
        message: 'Name, email, and technology are all required.',
      });
    }

    const updated = await Registration.findByIdAndUpdate(
      req.params.id,
      { name, email, technology },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Registration not found.' });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating registration:', error.message);
    return res.status(500).json({
      message: 'Something went wrong while updating the registration.',
    });
  }
});

// DELETE /api/registrations/:id  -> delete a registration
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Registration not found.' });
    }

    return res.status(200).json({ message: 'Registration deleted successfully.', deleted });
  } catch (error) {
    console.error('Error deleting registration:', error.message);
    return res.status(500).json({
      message: 'Something went wrong while deleting the registration.',
    });
  }
});

module.exports = router;
