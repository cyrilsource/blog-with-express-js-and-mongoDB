const express = require('express')
const router = express.Router()

const categoryCtrl = require('../controllers/category.js')

router.get('/admin/addPost', categoryCtrl.getAllCategories)
router.post('/admin/createCategory', categoryCtrl.createCategory)
// route delete via post, because method in the delete form
router.post('/admin/deleteCategory/:id', categoryCtrl.deleteCategory)

router.get('/category/:slug', categoryCtrl.getOneCategory)

module.exports = router
