const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

// @desc    Show all projects
// @route   GET /projects
router.get('/', ensureAuth, async (req, res) => {
  try {
    //   const stories = await Story.find({ status: 'public' })
    //     .populate('user')
    //     .sort({ createdAt: 'desc' })
    //     .lean()
    const projects = [
      {
        _id: '1',
        name: 'Project 1',
        abstract:
          'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis aut quisquam totam deserunt cum numquam nisi soluta obcaecati! Provident, itaque dolor alias quam minus corporis blanditiis earum temporibus qui quibusdam.',
        stories: 12,
      },
      {
        _id: '2',
        name: 'Project 2',
        abstract:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta veniam ullam id harum perferendis facere sapiente sed, doloribus accusamus tempore nostrum corporis sint earum ab nemo, voluptatibus corrupti. Quo, ipsa!',
        stories: 19,
      },
      {
        _id: '3',
        name: 'Project 3',
        abstract:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur repellat, in esse quibusdam perferendis eligendi id accusantium temporibus corporis voluptatem, nobis vero maiores commodi saepe! Cum impedit omnis dicta fuga?',
        stories: 3,
      },
      {
        _id: '4',
        name: 'Project 4',
        abstract:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, doloribus. Error, accusantium obcaecati accusamus sapiente numquam aliquam dicta neque optio similique, vel eaque eius! Laudantium dolores quos deserunt distinctio quasi.',
        stories: 31,
      },
      {
        _id: '5',
        name: 'Project 5',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam accusantium fugiat facere repellat labore ea magnam deserunt voluptates dolore quam ipsam qui ducimus, non quo iusto sit, ullam earum voluptatum.',
        stories: 11,
      },
    ]
    res.render('projects/index', {
      projects,
    })
  } catch (err) {
    console.error(err, 'projects')
    res.render('error/500')
  }
})
module.exports = router
