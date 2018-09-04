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
		res.redirect(`/${req.version}/login?redirect=estimator/use-existing-estimate`)
	} else if (hasAccount === 'no') {
		res.redirect(`business-details`)
	} else {
		res.render(`${req.version}/estimator/account-check`)
	}
})

router.get('/estimator/business-details', (req, res) => {
	var levy = req.session.data['annual-payroll']
	if (levy >= 36000000) {
		res.redirect(`/${req.version}/estimator/english-percentage`)
	} else if (levy < 36000000) {
		res.redirect(`levy-outcome`)
	} else {
		res.render(`${req.version}/estimator/business-details`)
	}
})

router.get('/estimator/use-existing-estimate', (req, res) => {
	var useExisting = req.session.data['use-existing-estimate']
	if (useExisting === 'true') {
		res.redirect(`/${req.version}/estimator/apprenticeships-list`)
	} else if (useExisting === 'false') {
		res.redirect(`add-apprenticeship`)
	} else {
		res.render(`${req.version}/estimator/use-existing-estimate`)
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