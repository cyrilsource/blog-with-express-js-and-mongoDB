const express = require('express')
const router = express.Router()

const multer = require('../middleware/multer-config.js')

const postsCtrl = require('../controllers/posts')

/* GET home page. */
router.get('/admin', postsCtrl.getAllPosts)
router.post('/admin/addPost', multer, postsCtrl.createPost)

/* GET one post. */
router.get('/admin/editPost/:id', postsCtrl.getOnePost)

/* UPDATE a post */
router.put('/admin/editPost/:id', postsCtrl.updatePost)

// route delete via post, because method in the delete form
router.post('/admin/:id', postsCtrl.deletePost)
// route delete image via method get, href
router.get('/admin/deleteImage/:id', postsCtrl.deleteImage)
// and the route with image upload (to upload a new picture)
router.get('/admin/changeImage/:id', postsCtrl.changeImage)
// and the route update the image
router.post('/admin/changeImage/:id', multer, postsCtrl.updateImage)

module.exports = router
