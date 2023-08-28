const Job = require('../models/jobmodel')

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

//update a job
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

module.exports = {
  getjobs,
  getjob,
  createjob,
  deletejob,
  updatejob,

}