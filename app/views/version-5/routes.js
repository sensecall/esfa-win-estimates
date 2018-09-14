const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
	res.redirect(`/${req.version}/start`)
})

router.get('/login', (req, res) => {
	var currentPage = 'login'
	res.render(`${req.version}/login`,{currentPage})
})

router.post('/login', (req, res) => {
	if (req.session.data['redirect']) {
		res.redirect(`/${req.version}/${req.session.data['redirect']}`)
	} else {
		res.redirect(`account-home`)
	}
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

router.post('/estimator/account-check', (req, res) => {
	var hasAccount = req.session.data['has-account']
	if (hasAccount === 'yes') {
		res.redirect(`/${req.version}/login?redirect=future-spending`)
	} else {
		req.session.data['has-account'] = 'no'
		res.redirect(`business-details`)
	}
})

router.post('/used-service-before', (req, res) => {
	var hasAccount = req.session.data['has-account']
	if (hasAccount === 'yes') {
		res.redirect(`login`)
	} else {
		res.redirect(`login`)
	}
})

router.post('/estimator/business-details', (req, res) => {
	var levy = req.session.data['annual-payroll']
	if (levy >= 36000000) {
		res.redirect(`/${req.version}/estimator/english-percentage`)
	} else {
		res.redirect(`levy-outcome`)
	}
})

// router.get('/estimator/apprenticeships-list', (req, res) => {
// 	var loggedIn = req.session.data['loggedIn']
// 	var currentPage = 'finance'

// 	if (loggedIn === 'false') {
// 		res.render(`${req.version}/estimator/apprenticeships-list__logged-out`,{currentPage})
// 	} else {
// 		res.render(`${req.version}/estimator/current-apprenticeships`,{currentPage})
// 	}
// })

// router.get('/estimator/add-apprenticeship', (req, res) => {
// 	var currentPage = 'finance'
// 	res.render(`${req.version}/estimator/add-apprenticeship`,{currentPage})
// })

router.post('/add-apprenticeship', (req, res) => {
	req.session.data['apprenticeship-added'] = true
	req.session.data['apprenticeship-updated'] = false
	req.session.data['apprenticeship-removed'] = false
	res.redirect('future-spending')
})

router.post('/edit-apprenticeship', (req, res) => {
	req.session.data['apprenticeship-updated'] = true
	req.session.data['apprenticeship-added'] = false
	req.session.data['apprenticeship-removed'] = false
	res.redirect('future-spending')
})

module.exports = router