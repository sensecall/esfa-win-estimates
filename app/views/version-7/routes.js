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
		req.session.data['logged-in'] = 'false'
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


router.post('/existing-estimate', (req, res) => {
	if (req.session.data['use-existing-estimate'] == 'yes') {
		res.redirect('future-spending')
	} else {
		res.redirect('add-apprenticeship')
	}
})

router.post('/estimator/business-details', (req, res) => {
	var payroll = req.session.data['payroll']
	var monthlyPayroll = req.session.data['monthly-payroll']

	if (payroll == 'under-3million') {
		req.session.data['annual-levy-amount'] = ''
		req.session.data['annual-payroll'] = '0'
		res.redirect(`levy-outcome`)
	} else {
		req.session.data['annual-payroll'] = monthlyPayroll * 12
		res.redirect(`english-percentage`)
	}
})

router.get('/estimator/levy-outcome', (req, res) => {
	var payroll = req.session.data['annual-payroll']

	if (payroll < 36000000) {
		res.render(`${req.version}/estimator/levy-outcome--non-levy`)
	} else {
		res.render(`${req.version}/estimator/levy-outcome--levy`)
	}
})

router.get('/estimator/estimate', (req, res) => {
	if (req.session.data['annual-payroll'] >= 36000000) {
		res.render(`${req.version}/estimator/estimate--levy`)
	} else {
		res.render(`${req.version}/estimator/estimate--non-levy`)
	}
})

router.post('/estimator/employees', (req, res) => {
	var employees = req.session.data['employees']
	var payroll = req.session.data['annual-payroll']

	if (employees == "over-50" && payroll >= 36000000) {
		res.redirect(`/${req.version}/estimator/english-percentage`)
	} else {
		req.session.data['annual-levy-amount'] = ''
		res.redirect(`levy-outcome`)
	}
})

router.post('/estimator/english-percentage', (req, res) => {
	var englishPercentage = req.session.data['english-percentage'] || '100'
	var monthlyLevyPayment = Math.floor(((req.session.data['annual-payroll'] * 0.005)-15000)/12)
	var monthlyLevyAmount = Math.ceil(monthlyLevyPayment * englishPercentage / 100 * 1.1)
	var annualLevyAmount = Math.round(monthlyLevyAmount * 12)

	req.session.data['english-percentage'] = englishPercentage
	req.session.data['monthly-levy-payment'] = monthlyLevyPayment
	req.session.data['monthly-levy-amount'] = monthlyLevyAmount
	req.session.data['annual-levy-amount'] = annualLevyAmount

	var employees = req.session.data['employees']

	if (employees == "under-50") {
		req.session.data['annual-levy-amount'] = ''	
	}

	res.redirect(`levy-outcome`)
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
	req.session.data['apprenticeship-added'] = 'true'
	req.session.data['apprenticeship-updated'] = 'false'
	req.session.data['apprenticeship-removed'] = 'false'

	if (req.session.data['logged-in'] == 'true') {
		res.redirect('future-spending')
	} else {
		res.redirect('estimator/estimate')
	}
})

router.post('/edit-apprenticeship', (req, res) => {
	req.session.data['apprenticeship-updated'] = 'true'
	req.session.data['apprenticeship-added'] = 'false'
	req.session.data['apprenticeship-removed'] = 'false'
	
	if (req.session.data['logged-in'] == 'true') {
		res.redirect('future-spending')
	} else {
		res.redirect('estimator/estimate')
	}
})

module.exports = router