const express = require('express')

const router = new express.Router()

router.post('/question-1', (req, res) => {
	var bespoke = req.body['bespoke-guidance']
	if (bespoke === 'true') {
		res.redirect(`question-2`)
	} else {
		res.redirect(`task-list`)
	}
})

router.get('/costs', (req, res) => {
	res.redirect('costs-of-employing-an-apprentice')
})

module.exports = router
