const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  inOrder: {
    type: String,
    required: true,
  },
  asA: {
    type: String,
    required: true,
  },
  iWant: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  gherkins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gherkin',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Story', StorySchema)
