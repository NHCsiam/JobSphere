

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const appliedjobsSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  jobid: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('appliedjobmodel', appliedjobsSchema)

