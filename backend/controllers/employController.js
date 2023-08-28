const Employer = require('../models/employModel'); // Update the path accordingly
const bcrypt = require('bcrypt');

// Controller function to insert employer info into the database
async function createEmployer(req, res) {
    const { companyName, email, password } = req.body;

    try {
        // Check if employer with the given email already exists
        const existingEmployer = await Employer.findOne({ email });
        if (existingEmployer) {
            return res.status(400).json({ error: 'Employer with this email already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new employer instance
        const newEmployer = new Employer({
            companyName,
            email,
            password: hashedPassword,
        });

        // Save the employer to the database
        await newEmployer.save();

        return res.status(201).json({ message: 'Employer created successfully' });
    } catch (error) {
        console.error('Error creating employer:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function loginEmployer(req, res) {
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

        // Here, you can generate a JWT token and send it as a response
        // For simplicity, let's just send a success message for now
        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { createEmployer, loginEmployer };




