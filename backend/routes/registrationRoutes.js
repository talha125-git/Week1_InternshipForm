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

module.exports = router;
