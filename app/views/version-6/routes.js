const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.version}/start`)
})

router.post('/ilr-submission/upload-ilr-file', (req, res) => {
  res.redirect(`/${req.version}/ilr-submission/uploading`)
})

router.post('/ilr-submission/uploading', (req, res) => {
  res.redirect(`/${req.version}/ilr-submission/upload-complete?ilr-status=ok`)
})

router.post('/choose-submission', (req, res) => {
  var submissionType = req.body['submissionType']
  if (submissionType === 'ilr') {
    res.redirect(`/${req.version}/ilr-submission/upload-ilr-file`)
  } else {
    res.redirect(`/${req.version}/eas/test-form`)
  }
})

router.get('/ilr-submission/email', (req, res) => {
  var url = req.protocol + '://' + req.get('host');
  res.render(`${req.version}/ilr-submission/email`,{url})
})

router.post('/ilr-submission/upload-complete', (req, res) => {
    res.redirect(`/${req.version}/ilr-submission/submission-complete`)
})

// ———————————————————————————————————————————————
// EAS form
// ———————————————————————————————————————————————
router.post('/eas/test-form', (req, res) => {
  var action = req.body['add-claim']

  if (req.body['add-claim']) {
    res.redirect(`/${req.version}/eas/test-form`)
  } else if(req.body['save-finish']) {
    res.redirect(`/${req.version}/eas/test-form-complete`)
  }
})

module.exports = router
