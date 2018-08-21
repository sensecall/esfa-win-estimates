const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.version}/start`)
})

router.get('/login', (req, res) => {
  var currentPage = 'login'
  res.render(`${req.version}/login`,{currentPage})
})

module.exports = router