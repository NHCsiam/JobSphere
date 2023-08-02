const express = require('express')
const {
  getjobs, 
  getjob, 
  createjob, 
  deletejob, 
  updatejob,
  // getJobSectors,      
  // createJobSector 
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

// router.get("/jobsectors", getJobSectors);

// router.post("/jobsectors", createJobSector);
// router.get("/sectors/:sector", jobController.getJobsBySector);


module.exports = router;