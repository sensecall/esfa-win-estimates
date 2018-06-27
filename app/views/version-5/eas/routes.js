const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/start`)
})

router.post('/upload-ilr-file', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/uploading`)
})

router.post('/uploading', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/upload-complete?ilr-status=errors`)
})

router.post('/choose-submission', (req, res) => {
  var submissionType = req.body['submissionType']
  if (submissionType === 'eas') {
    res.redirect(`/${req.feature}/${req.sprint}/new-claim`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/choose-submission`)
  }
})

router.get('/email', (req, res) => {
  var url = req.protocol + '://' + req.get('host');
  res.render(`${req.feature}/${req.sprint}/email`,{url})
})

router.post('/choose-category', (req, res) => {
  var category = req.body['category']
  var required = ['2-1','2-2','2-3','2-4','2-5','2-6']

  function check(arr, val) {
    return arr.some(arrVal => val === arrVal);
  }

  if (check(required, category) === true) {
    res.redirect(`/${req.feature}/${req.sprint}/choose-sub-category`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/input-values`)
  }
})

router.post('/upload-complete', (req, res) => {
  var submitFile = req.body['submit-file']
  if (submitFile === 'true') {
    res.redirect(`/${req.feature}/${req.sprint}/email-option`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/data-not-submitted`)
  }
})

router.post('/test-form', (req, res) => {
  var action = req.body['add-claim']

  if (req.body['add-claim']) {
    res.redirect(`/${req.feature}/${req.sprint}/test-form`)
  } else if(req.body['save-finish']) {
    res.redirect(`/${req.feature}/${req.sprint}/test-form-complete`)
  }
})

router.post('/review-claims', (req, res) => {
  var addClaim = req.body['addClaim']
  if (addClaim === 'true') {
    res.redirect(`/${req.feature}/${req.sprint}/choose-month`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/claim-complete`)
  }
})

module.exports = router
