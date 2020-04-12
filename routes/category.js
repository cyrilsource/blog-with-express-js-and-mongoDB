const express = require('express')
const router = express.Router()

const categoryCtrl = require('../controllers/category.js')

router.get('/', categoryCtrl.getAllCategories)
router.post('/createCategory', categoryCtrl.createCategory)

module.exports = router
