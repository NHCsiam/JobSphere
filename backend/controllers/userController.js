const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // create a token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// signup a user
const signupUser = async (req, res) => {
    const { email, password } = req.body; // Include name in the request body

    try {
        const user = await User.signup( email, password);

        // create a token
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Save a job for a user
const saveJob = async (req, res) => {
    const userId = req.user._id; // Assuming you have a middleware that sets req.user
    const jobId = req.params.jobId; // Job ID to be saved

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { savedJobs: jobId } }, // Use $addToSet to avoid duplicates
            { new: true }
        );

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { signupUser, loginUser, saveJob };
