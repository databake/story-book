const express = require('express')
const router = express.Router({ mergeParams: true })
const Project = require('../models/Project')
const Story = require('../models/Story')
const { ensureAuth } = require('../middleware/auth')

// Include other resources
const storiesRouter = require('./stories')

// Re-route into other resource routers
router.use('/:projectId/stories', storiesRouter)

// @desc    Show add page
// @route   GET /projects/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('projects/add')
})

// @desc    Process add form
// @route   POST /projects
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Project.create(req.body)
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Show all projects
// @route   GET /projects
router.get('/', ensureAuth, async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('project')
      .sort({ createdAt: 'desc' })
      .lean()

    res.render('projects/index', {
      projects,
    })
  } catch (err) {
    console.error(err, 'projects')
    res.render('error/500')
  }
})

// @desc    Show single project
// @route   GET /project/:id
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id).populate('user').lean()

    if (!project) {
      return res.render('error/404')
    }

    res.render('projects/show', {
      project: project,
    })
  } catch (err) {
    console.error(err)
    res.render('error/404')
  }
})

// @desc    Show edit page
// @route   GET /projects/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
    }).lean()

    if (!project) {
      return res.render('error/404')
    }

    if (project.user != req.user.id) {
      res.redirect('/projects')
    } else {
      res.render('projects/edit', {
        project: project,
      })
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Update project
// @route   PUT /projects/:id
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id).lean()

    if (!project) {
      return res.render('error/404')
    }

    if (project.user != req.user.id) {
      res.redirect('/projects/edit')
    } else {
      project = await Project.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )

      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    Delete project
// @route   DELETE /projects/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    let project = await Project.findById(req.params.id).lean()

    if (!project) {
      return res.render('error/404')
    }

    if (project.user != req.user.id) {
      res.redirect('/projects')
    } else {
      await Project.remove({ _id: req.params.id })
      res.redirect('/dashboard')
    }
  } catch (err) {
    console.error(err)
    return res.render('error/500')
  }
})

// @desc    User projects
// @route   GET /projects/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
  try {
    const projects = await Project.find({
      user: req.params.userId,
      status: 'public',
    })
      .populate('user')
      .lean()

    res.render('projects/index', {
      projects,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

// @desc    Project Stories
// @route   GET /projects/:id/stories

// router.get('/:id/stories', ensureAuth, async (req, res) => {
//   try {
//     const stories = await Story.find({ project: req.params.id })
//       .populate('project')
//       .lean()

//     res.render('stories/index', {
//       stories,
//     })
//   } catch (err) {
//     console.error(err)
//     res.render('error/404')
//   }
// })

module.exports = router
