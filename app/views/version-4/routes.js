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
	var currentPage = 'account-home'
	res.render(`${req.version}/account-home`,{currentPage})
})

router.get('/estimator', (req, res) => {
	res.redirect(`/${req.version}/estimator/start`)
})

router.get('/finance', (req, res) => {
	var currentPage = 'finance'
	res.render(`${req.version}/finance`,{currentPage})
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

router.get('/estimator/apprenticeships-list', (req, res) => {
	var loggedIn = req.session.data['loggedIn']
	var currentPage = 'finance'

	if (loggedIn === 'false') {
		res.render(`${req.version}/estimator/apprenticeships-list__logged-out`,{currentPage})
	} else {
		res.render(`${req.version}/estimator/current-apprenticeships`,{currentPage})
	}
})

router.get('/estimator/add-apprenticeship', (req, res) => {
	var currentPage = 'finance'
	res.render(`${req.version}/estimator/add-apprenticeship`,{currentPage})
})

module.exports = router