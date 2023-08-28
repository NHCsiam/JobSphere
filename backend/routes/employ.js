const express = require('express');
const router = express.Router();
const { createEmployer } = require('../controllers/employController');
const bcrypt = require('bcrypt');
const Employer = require('../models/employModel');

// Signup Route
router.post('/signup', createEmployer);

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const employer = await Employer.findOne({ email });

    if (!employer) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, employer.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Here you can generate a JWT token and send it as a response
    // For simplicity, let's just send a success message for now
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
