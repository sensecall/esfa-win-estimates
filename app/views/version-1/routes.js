const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.version}/start`)
})

router.get('/login', (req, res) => {
  var currentPage = 'login'
  res.render(`${req.version}/login`,{currentPage})
})

router.get('/account-home', (req, res) => {
  var currentPage = 'home'
  res.render(`${req.version}/account-home`,{currentPage})
})

router.get('/finance', (req, res) => {
  var currentPage = 'finance'
  res.render(`${req.version}/finance`,{currentPage})
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
    var returnPeriodStatus = req.body['returnPeriodStatus']
    var overlappingReturnPeriod = req.body['overlappingReturnPeriod']

    if (returnPeriodStatus != 'closed'){
      if (overlappingReturnPeriod != 'true'){
        var page = 'upload-ilr-file'
      } else {
        var page = 'choose-return-period'
      }
    } else {
      var page = 'window-closed-notice'
    }
    res.redirect(`/${req.version}/ilr-submission/${page}`)
  } else if (submissionType === 'eas') {
    res.redirect(`/${req.version}/eas/statement`)
  } else {
    res.redirect(`/${req.version}/esf/upload-esf-file`)
  }
})

router.get('/ilr-submission/upload-ilr-file', (req, res) => {
  var ilrReturnWindow = req.body['ilrReturnWindow']
  if (ilrReturnWindow === 'open'){
    res.redirect(`${req.version}/ilr-submission/dasljdalskdjsad`)
  } else {
    res.render(`${req.version}/ilr-submission/upload-ilr-file`)
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

// ———————————————————————————————————————————————
// ESF form
// ———————————————————————————————————————————————
router.post('/esf/upload-esf-file', (req, res) => {
  res.redirect(`/${req.version}/esf/submission-complete`)
})

module.exports = router
