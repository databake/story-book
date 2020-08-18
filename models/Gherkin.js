const mongoose = require('mongoose')

const GherkinSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Gherkin', GherkinSchema)
