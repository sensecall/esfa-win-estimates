const express = require('express')
const router = new express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// Get Sprint and Feature for URL links
router.use('/', (req, res, next) => {
  req.version = req.originalUrl.split('/')[1] // this is added by DC project
  req.feature = req.originalUrl.split('/')[1]
  req.sprint = req.originalUrl.split('/')[2]
  res.locals.version = req.version // this is added by DC project
  res.locals.feature = req.feature
  res.locals.sprint = req.sprint
  next()
})

// VERSIONS
// router.use(/\/version-([0-9]+)/, (req, res, next) => {
//   require(`./views/version-${req.params[0]}/routes`)(req, res, next);
// })

// ------------------
// Other ------------
// ------------------
// Basic linear journey
router.use(/\/basic-linear\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/basic-linear/version-${req.params[0]}/routes`)(req, res, next);
})

// Non-GDS journey
router.use(/\/microsite\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/microsite/version-${req.params[0]}/routes`)(req, res, next);
})

// Branching
router.use(/\/branching\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/branching/version-${req.params[0]}/routes`)(req, res, next);
})

// Question and answer
router.use(/\/question-answer\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/question-answer/version-${req.params[0]}/routes`)(req, res, next);
})

// Branching
router.use(/\/campaign\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/campaign/version-${req.params[0]}/routes`)(req, res, next);
})

module.exports = router
