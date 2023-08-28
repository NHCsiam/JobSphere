const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;