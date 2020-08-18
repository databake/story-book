const express = require('express')
const router = express.Router({ mergeParams: true })
const Story = require('../models/Story')
const { ensureAuth } = require('../middleware/auth')

// @desc    Project Stories
// @route   GET /projects/:id/stories

router.get('/', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ project: req.params.projectId })
      .populate('project')
      .lean()

    res.render('stories/index', {
      stories,
    })
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})

module.exports = router
