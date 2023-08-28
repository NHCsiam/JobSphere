require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const jobRoutes = require('./routes/jobdata')
const userRoutes = require('./routes/user')
const employRoutes = require('./routes/employ')
const appliedRoutes=require('./routes/applied')
const savedRoutes=require('./routes/saved')


// const employRoutes=require('./routes/employ')
// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
// routes
app.use('/api/jobdata', jobRoutes)
app.use('/api/user', userRoutes)
app.use('/api/employ', employRoutes)
app.use('/api/applied',appliedRoutes)
app.use('/api/saved',savedRoutes)
// app.use('/api/employ',appliedRoutes)
// app.use('/applied-jobs', require('./appliedJobsRoutes')); // Update the path if needed

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 