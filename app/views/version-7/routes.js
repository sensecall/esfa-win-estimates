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
    res.redirect(`/${req.version}/eas/statement`)
  }
})

router.get('/ilr-submission/email', (req, res) => {
  var url = req.protocol + '://' + req.get('host');
  res.render(`${req.version}/ilr-submission/email`,{url})
})

router.post('/ilr-submission/upload-complete', (req, res) => {
  var submitILR = req.body['submit-file']
  if (submitILR === 'true') {
    res.redirect(`/${req.version}/ilr-submission/submission-complete`)
  } else {
    res.redirect(`/${req.version}/ilr-submission/data-not-submitted`)
  }
})

// ———————————————————————————————————————————————
// EAS form
// ———————————————————————————————————————————————
router.post('/eas/statement', (req, res) => {
  if (req.body['new-claim']) {
    res.redirect(`/${req.version}/eas/new-claim`)
  } else if(req.body['save-finish']) {
    res.redirect(`/${req.version}/eas/complete`)
  }
})

router.get('/eas/', (req, res) => {
  res.redirect(`/${req.version}/eas/statement`)
})

router.post('/eas/new-claim', (req, res) => {
  res.redirect(`/${req.version}/eas/statement`)
})

router.post('/eas/change-claim', (req, res) => {
  if (req.body['save-changes']) {
    res.redirect(`/${req.version}/eas/statement`)
  } else if(req.body['delete-claim']) {
    res.redirect(`/${req.version}/eas/statement`)
  }
})

module.exports = router
