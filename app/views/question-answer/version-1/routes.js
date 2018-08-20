const express = require('express')

const router = new express.Router()

router.get('/question-2', (req, res) => {
	var bespoke = req.query['bespoke-guidance'];
	if(bespoke == 'true'){
		res.render(`${req.feature}/${req.sprint}/question-2`)
	} else {
		res.redirect(`task-list`)
	}
})

module.exports = router
