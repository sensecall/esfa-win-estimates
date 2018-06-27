const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/google-start`)
})

router.post('/upload-ilr-file', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/uploading`)
})

router.post('/uploading', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/upload-complete?ilr-status=errors`)
})

router.post('/choose-submission', (req, res) => {
  var submissionType = req.body['submissionType']
  if (submissionType === 'ilr') {
    res.redirect(`/${req.feature}/${req.sprint}/upload-ilr-file`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/choose-submission`)
  }
})

router.get('/email', (req, res) => {
  var url = req.protocol + '://' + req.get('host');
  res.render(`${req.feature}/${req.sprint}/email`,{url})
})

router.post('/upload-complete', (req, res) => {
  var submitFile = req.body['submit-file']
  if (submitFile === 'true') {
    res.redirect(`/${req.feature}/${req.sprint}/email-option`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/data-not-submitted`)
  }
})

module.exports = router
