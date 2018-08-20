const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
	res.render(`${req.feature}/${req.sprint}/list`)
})

router.get('/apprenticeship-costs', (req, res) => {
	var taskStep = '2'
	res.render(`${req.feature}/${req.sprint}/apprenticeship-costs`,{taskStep})
})

// Branching
router.get('/costs-levy-check', function (req, res) {
	var levy = req.query.levy

	if (levy === 'false') {
		res.redirect(`/${req.feature}/${req.sprint}/non-levy`)
	} else if (levy === 'true') {
		res.redirect(`/${req.feature}/${req.sprint}/levy-payer`)
	} else {
		res.render(`${req.feature}/${req.sprint}/costs-levy-check`)
	}
})

module.exports = router
