const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

// const Project = require('../models/Project')

// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    // const stories = await Story.find({ user: req.user.id }).lean()
    const projects = [
      {
        _id: '1',
        name: 'Project One',
        abstract:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi beatae vel et in tempore nam consectetur ratione, provident error perspiciatis, magni iure sit rem rerum. Aut doloribus possimus hic suscipit.',
        createdAt: '2020-08-06T10:00:00Z',
      },
      {
        _id: '2',
        name: 'Project Two',
        abstract:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia porro dolorum et non, laboriosam vero impedit provident explicabo nesciunt velit.',
        createdAt: '2020-07-06T10:00:00Z',
      },
    ]

    res.render('dashboard', {
      name: req.user.firstName,
      projects,
    })
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
})

module.exports = router
