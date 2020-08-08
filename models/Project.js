const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },
  status: {
    type: String,
    default: 'public',
    enum: ['public', 'private'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  stories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Story',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Project', ProjectSchema)
