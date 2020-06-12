const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema


// Create Schema
const projectSchema = new Schema( {
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [ true, 'Project must belong to a user' ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  startedAt: {
    type: Date
  },
  finishedAt: {
    type: Date
  },
  started: {
    type: Boolean,
    default: false
  },
  finished: {
    type: Boolean,
    default: false
  }
} )

const Project = mongoose.model( 'Project', projectSchema )
module.exports = Project