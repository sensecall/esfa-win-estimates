const express = require('express')

const router = new express.Router()

router.post('/settings', (req, res) => {
  var authenticated = req.body['authenticated']
  if (authenticated === 'true') {    
    res.redirect(`/${req.version}/sfs`)
  } else {
    res.redirect(`/${req.version}/`)
  }
})

router.get('/', (req, res) => {
  res.redirect(`/${req.version}/manage-account`)
})

router.get('/manage-account', (req, res) => {
 var ilrStatus = req.session.data['authenticated']
 if (ilrStatus === 'true') {
  res.render(`${req.version}/home-v2`)
} else {
  res.render(`${req.version}/guidance`)
}
})

router.get('/sfs', (req, res) => {
  res.render(`${req.version}/sfs-home`)
})

router.post('/submit-ilr', (req, res) => {
  var submissionType = req.body['submissionType']
  if (submissionType === 'online') {    
    res.redirect(`/${req.version}/submit-ilr-online/learners-left`)
  } else {
    res.redirect(`/${req.version}/upload-ilr-file`)
  }
})

router.get('/ilr-details', (req, res) => {
  var ilrStatus = req.session.data['ilr-submission-status']
  if (ilrStatus === 'processed') {
    res.render(`${req.version}/ilr-details--processed`)
  } else if (ilrStatus === 'processing') {
    res.render(`${req.version}/ilr-details--processing`)
  } else if (ilrStatus === 'errors') {
    res.render(`${req.version}/ilr-details--processing`)
  } else {
    res.render(`${req.version}/ilr-details--empty`)
  }
})

router.get('/upload-ilr-file', (req, res) => {
  res.render(`${req.version}/upload-ilr-file/upload-ilr-file`)
})

router.post('/upload-ilr-file', (req, res) => {
  res.redirect(`/${req.version}/upload-ilr-file/uploading`)
})

router.post('/submit-ilr-online/learners-left', (req, res) => {
  var submissionType = req.body['learners-left']
  if (submissionType === 'true') {
    res.redirect(`/${req.version}/submit-ilr-online/learners-left-search`)
  } else {
    res.redirect(`/${req.version}/submit-ilr-online/learners-joined`)
  }
})

router.post('/submit-ilr-online/learners-joined', (req, res) => {
  var submissionType = req.body['learners-joined']
  if (submissionType === 'true') {
    res.redirect(`/${req.version}/submit-ilr-online/add-learner-1`)
  } else {
    res.redirect(`/${req.version}/submit-ilr-online/change-learner-details`)
  }
})

router.post('/submit-ilr-online/change-learner-details', (req, res) => {
  var submissionType = req.body['learners-changed']
  if (submissionType === 'true') {
    res.redirect(`/${req.version}/submit-ilr-online/change-learner-details`)
  } else {
    res.redirect(`/${req.version}/submit-ilr-online/summary`)
  }
})

router.post('/submit-ilr-online/learners-left-additional', (req, res) => {
  var submissionType = req.body['learners-left-additional']
  if (submissionType === 'true') {
    res.redirect(`/${req.version}/submit-ilr-online/learners-left-search`)
  } else {
    res.redirect(`/${req.version}/submit-ilr-online/learners-joined`)
  }
})

router.get('/email', (req, res) => {
  var url = req.protocol + '://' + req.get('host');
  res.render(`${req.version}/email`,{url})
})

module.exports = router
