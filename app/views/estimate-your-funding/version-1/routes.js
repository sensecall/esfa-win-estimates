const express = require('express')

const router = new express.Router()

router.post('/detailed-courses-check', (req, res) => {
  var answer = req.body['answer']
  if (answer === 'Yes') {    
    res.redirect(`/${req.feature}/${req.sprint}/detailed-courses`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/summary`)
  }
})

module.exports = router
