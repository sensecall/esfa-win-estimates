const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
	res.redirect(`/${req.version}/start`)
})

router.get('/login', (req, res) => {
	var currentPage = 'login'
	res.render(`${req.version}/login`,{currentPage})
})

router.get('/estimator/account-check', (req, res) => {
	var hasAccount = req.query.hasAccount
	if (hasAccount === 'yes') {
		res.redirect(`/${req.version}/login?redirect=funding-projection`)
	} else if (hasAccount === 'no') {
		res.redirect(`add-apprenticeship`)
	} else {
		res.render(`${req.version}/estimator/account-check`)
	}
})

module.exports = router