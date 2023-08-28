const express = require('express');
const router = express.Router();
const { createApplication,getAllAppliedJobs } = require('../controllers/appliedjobsController');

// Route to add a new applied job
router.post('/', createApplication);
router.get('/', getAllAppliedJobs);

module.exports = router;

