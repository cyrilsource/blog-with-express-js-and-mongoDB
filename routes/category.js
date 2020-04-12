const express = require('express')
const router = express.Router()

const categoryCtrl = require('../controllers/category.js')

router.get('/addPost', categoryCtrl.getAllCategories)
router.post('/createCategory', categoryCtrl.createCategory)
//router.delete('/deleteCategory/:id', categoryCtrl.deleteCategory)

module.exports = router
