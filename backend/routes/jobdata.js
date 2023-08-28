const express = require('express')
const {
  getjobs, 
  getjob, 
  createjob, 
  deletejob, 
  updatejob,


} = require('../controllers/jobController')

const router = express.Router()

// GET all jobs
router.get('/', getjobs)

// GET a single job
router.get('/:id', getjob)

// POST a new job
router.post('/', createjob)

// DELETE a job
router.delete('/:id', deletejob)

// UPDATE a job
router.patch('/:id', updatejob)
module.exports = router;


