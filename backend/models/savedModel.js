

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const savedSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  jobid: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('savedjobmodel', savedSchema)

