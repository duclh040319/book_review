const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')

router.post('/detail/:id/add-review', bookController.addReview)
router.get('/index', bookController.index)
router.get('/detail/:id', bookController.detail)

module.exports = router