const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/submission-type`)
})

router.post('/submission-type', (req, res) => {
  var submissionType = req.body['submissionType']
  if (submissionType === 'online') {    
    res.redirect(`/${req.feature}/${req.sprint}/learners-left`)
  } else {
    res.redirect('/version-2/submit-your-ilr')
  }
})

router.post('/learners-left', (req, res) => {
  var submissionType = req.body['learners-left']
  if (submissionType === 'true') {
    res.redirect(`/${req.feature}/${req.sprint}/learners-left-search`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/learners-joined`)
  }
})

router.post('/learners-joined', (req, res) => {
  var submissionType = req.body['learners-joined']
  if (submissionType === 'true') {
    res.redirect(`/${req.feature}/${req.sprint}/add-learner-1`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/change-learner-details`)
  }
})

router.post('/change-learner-details', (req, res) => {
  var submissionType = req.body['learners-changed']
  if (submissionType === 'true') {
    res.redirect(`/${req.feature}/${req.sprint}/change-learner-details`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/summary`)
  }
})

router.post('/learners-left-additional', (req, res) => {
  var submissionType = req.body['learners-left-additional']
  if (submissionType === 'true') {
    res.redirect(`/${req.feature}/${req.sprint}/learners-left-search`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/learners-joined`)
  }
})

router.get('/file', (req, res) => {
	res.redirect('/file')
})

module.exports = router
