const express = require('express')

const router = new express.Router()

router.get('/what-is-an-apprenticeship', (req, res) => {
	var taskStep = '1'
	res.render(`${req.feature}/${req.sprint}/what-is-an-apprenticeship`,{taskStep})
})

router.get('/apprenticeship-costs', (req, res) => {
	var taskStep = '2'
	res.render(`${req.feature}/${req.sprint}/apprenticeship-costs`,{taskStep})
})

module.exports = router
