const express = require('express');
const router = express.Router();
const { savApplication,savedJobs } = require('../controllers/savedController');

// Route to add a new applied job
router.post('/', savApplication);
router.get('/', savedJobs);

module.exports = router;
