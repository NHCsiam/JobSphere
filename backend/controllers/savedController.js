const SavedModel = require('../models/savedModel');

const savApplication = async (req, res) => {
    const { userid, jobid } = req.body;

    try {
        // Create a new job application
        const saved = await SavedModel.create({ userid, jobid });
        res.status(201).json({ message: 'Job application created successfully', saved });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//gettall
const savedJobs = async (req, res) => {
    try {
        // Retrieve all applied jobs
        const savedJobs = await SavedModel.find();
        res.status(200).json({ savedJobs });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching applied jobs' });
    }
};



module.exports = {
    savApplication,
    savedJobs
};