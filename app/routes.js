const express = require('express')

const router = new express.Router()

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

router.get('/', (req, res) => {
  res.render('index')
})

// Dan's Versions
router.use(/\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/version-${req.params[0]}/routes`)(req, res, next);
})

// ILR submission
router.use(/\/ilr-submission\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/ilr-submission/version-${req.params[0]}/routes`)(req, res, next);
})

// Estimator
router.use(/\/estimate-your-funding\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/estimate-your-funding/version-${req.params[0]}/routes`)(req, res, next);
})

// EAS
router.use(/\/earnings-adjustment-statement\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/earnings-adjustment-statement/version-${req.params[0]}/routes`)(req, res, next);
})

// Student data entry
router.use(/\/student-data-collection\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/student-data-collection/version-${req.params[0]}/routes`)(req, res, next);
})

module.exports = router
