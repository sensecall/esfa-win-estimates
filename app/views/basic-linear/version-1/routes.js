const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
	res.redirect(`what-is-an-apprenticeship`)
})

router.get('/apprenticeship-costs', (req, res) => {
	var taskStep = '2'
	res.render(`${req.feature}/${req.sprint}/apprenticeship-costs`,{taskStep})
})

module.exports = router