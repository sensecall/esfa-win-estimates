const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
	res.redirect(`/${req.version}/start`)
})

router.get('/login', (req, res) => {
	var currentPage = 'login'
	res.render(`${req.version}/login`,{currentPage})
})

router.get('/estimator', (req, res) => {
	res.redirect(`/${req.version}/estimator/start`)
})

router.get('/estimator/account-check', (req, res) => {
	var hasAccount = req.query.hasAccount
	if (hasAccount === 'yes') {
		res.redirect(`/${req.version}/login?redirect=funding-projection`)
	} else if (hasAccount === 'no') {
		res.redirect(`business-details`)
	} else {
		res.render(`${req.version}/estimator/account-check`)
	}
})

router.get('/estimator/apprenticeships-list', (req, res) => {
	var addMoreApprenticeships = req.query.addMoreApprenticeships
	if (addMoreApprenticeships === 'no') {
		res.redirect(`/${req.version}/estimator/add-apprenticeship`)
	} else if (addMoreApprenticeships === 'yes') {
		res.redirect(`/${req.version}/funding-projection`)
	} else {
		res.render(`${req.version}/estimator/apprenticeships-list`)
	}
})

module.exports = router