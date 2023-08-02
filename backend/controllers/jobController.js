const Job = require('../models/jobmodel')
// const JobSector = require('../models/jobSector')
const mongoose = require('mongoose')


// get all jobs
const getjobs = async (req, res) => {
  const jobs = await Job.find({}).sort({createdAt: -1})

  res.status(200).json(jobs)
}

// get a single job
const getjob = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such job'})
  }

  const job = await Job.findById(id)

  if (!job) {
    return res.status(404).json({error: 'No such job'})
  }

  res.status(200).json(job)
}

// create a new job
const createjob = async (req, res) => {
  const {title, company, position, salary, location, details, jobtype} = req.body

  // add to the database
  try {
    const job = await Job.create({ title, company, position, salary, location, details, jobtype })
    res.status(200).json(job)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a job
const deletejob = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such job'})
  }

  const job = await Job.findOneAndDelete({_id: id})

  if(!job) {
    return res.status(400).json({error: 'No such job'})
  }

  res.status(200).json(job)
}

// update a job
const updatejob = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such job'})
  }

  const job = await Job.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!job) {
    return res.status(400).json({error: 'No such job'})
  }

  res.status(200).json(job)
}

///////////



// const getJobSectors = async (req, res) => {
//   try {
//     const jobSectors = await JobSector.find();
//     res.status(200).json(jobSectors);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch job sectors." });
//   }
// };



// const createJobSector = async (req, res) => {
//   try {
//     const { name } = req.body;

//     // Check if the job sector with the same name already exists
//     const existingJobSector = await JobSector.findOne({ name });
//     if (existingJobSector) {
//       return res.status(409).json({ error: "Job sector already exists." });
//     }

//     // Create a new job sector
//     const newJobSector = new JobSector({ name });
//     await newJobSector.save();

//     res.status(201).json(newJobSector);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create job sector." });
//   }
// };


module.exports = {
  // createJobSector,
  // getJobSectors,
  getjobs,
  getjob,
  createjob,
  deletejob,
  updatejob
}