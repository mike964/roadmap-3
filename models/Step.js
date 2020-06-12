const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema


// Create Schema
const stepSchema = new Schema( {
  name: {
    type: String,
    required: true
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: [ true, 'Step must belong to a project' ]
  },
  finished: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  finishedAt: {
    type: Date
  }
} )

const Step = mongoose.model( 'Step', stepSchema )
module.exports = Step










// project = required