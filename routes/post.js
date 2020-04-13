const express = require('express')
const router = express.Router()

const multer = require('../middleware/multer-config.js')

const postsCtrl = require('../controllers/posts')

/* GET home page. */
router.get('/admin', postsCtrl.getAllPosts)
router.post('/admin/addPost', multer, postsCtrl.createPost)

module.exports = router
