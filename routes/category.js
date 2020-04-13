const express = require('express')
const router = express.Router()

const categoryCtrl = require('../controllers/category.js')

router.get('/addPost', categoryCtrl.getAllCategories)
router.post('/createCategory', categoryCtrl.createCategory)
// route delete via post, because method in the delete form
router.post('/deleteCategory/:id', categoryCtrl.deleteCategory)

module.exports = router
