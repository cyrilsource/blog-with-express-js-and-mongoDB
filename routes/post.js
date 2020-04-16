const express = require('express')
const router = express.Router()

const multer = require('../middleware/multer-config.js')

const postsCtrl = require('../controllers/posts')

/* GET home page. */
router.get('/admin', postsCtrl.getAllPosts)
router.post('/admin/addPost', multer, postsCtrl.createPost)
// route delete via post, because method in the delete form
router.post('/admin/:id', postsCtrl.deletePost)

module.exports = router
