const AppliedJobModel = require('../models/appliedJobsModel');

const createApplication = async (req, res) => {
    const { userid, jobid } = req.body;

    try {
        // Create a new job application
        const applied = await AppliedJobModel.create({ userid, jobid });
        res.status(201).json({ message: 'Job application created successfully', applied });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//gettall
const getAllAppliedJobs = async (req, res) => {
    try {
        // Retrieve all applied jobs
        const appliedJobs = await AppliedJobModel.find();
        res.status(200).json({ appliedJobs });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching applied jobs' });
    }
};



module.exports = {
    createApplication,
    getAllAppliedJobs
};