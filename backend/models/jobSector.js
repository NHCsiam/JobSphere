const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define the schema for the JobSector model
const jobSectorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures that each job sector name is unique
  },
});

// Create and export the JobSector model with correct model name
module.exports = mongoose.model("jobSector", jobSectorSchema);
