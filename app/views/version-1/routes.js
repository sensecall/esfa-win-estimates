const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
	res.redirect(`/${req.version}/settings`)
})

router.get('/reports', (req, res) => {
	var currentPage = 'reports'
	res.render(`${req.version}/reports`,{currentPage})
})

router.get('/data-submissions', (req, res) => {
	var currentPage = 'submit'
	res.render(`${req.version}/data-submissions/index`,{currentPage})
})

// ILR
router.get('/data-submissions/ilr', (req, res) => {
	var currentPage = 'submit'
	var show_ilr_button = true
	res.render(`${req.version}/data-submissions/ilr/index`,{currentPage,show_ilr_button})
})

router.get('/data-submissions/ilr/details', (req, res) => {
	var currentPage = 'submit'
	var show_ilr_button = true
	res.render(`${req.version}/data-submissions/ilr/details`,{currentPage,show_ilr_button})
})

router.get('/submit-your-ilr', (req, res) => {
	var currentPage = 'submit'
	res.render(`${req.version}/data-submissions/ilr/submit/index`,{currentPage})
})

router.get('/upload-your-ilr', (req, res) => {
	var currentPage = 'submit'
	res.render(`${req.version}/data-submissions/ilr/submit/upload-ilr`,{currentPage})
})

router.get('/ilr-upload-complete', (req, res) => {
	var currentPage = 'submit'
	res.render(`${req.version}/data-submissions/ilr/submit/ilr-upload-complete`,{currentPage})
})

router.get('/ilr-dates', (req, res) => {
	var currentPage = 'submit'
	res.render(`${req.version}/data-submissions/ilr/ilr-dates`,{currentPage})
})

router.get('/login', (req, res) => {
	var authenticated = req.query.authenticated
	if (authenticated === 'true') {
    // Redirect to the relevant page
	    res.redirect(`/${req.version}/data-submissions`,)
	} else {
    // If over18 is any other value (or is missing) render the page requested
		res.render(`${req.version}/login`,)
	}
})

router.get('/sfs', (req, res) => {
	res.render(`${req.version}/sfs-home`,)
})

router.get('/account-settings', (req, res) => {
	res.render(`${req.version}/account-settings`,)
})

router.get('/signed-out', (req, res) => {
	res.render(`${req.version}/signed-out`,)
})

router.get('/claim-esfa-funding', (req, res) => {
	var authenticated = req.query.authenticated
	if (authenticated === 'true') {
    // Redirect to the relevant page
	    res.redirect(`/${req.version}/data-submissions`,)
	} else {
    // If over18 is any other value (or is missing) render the page requested
		res.render(`${req.version}/index`,)
	}
})

module.exports = router
