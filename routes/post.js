const express = require('express')
const router = express.Router()

const multer = require('../middleware/multer-config.js')

const postsCtrl = require('../controllers/posts')

/* GET posts list home page for backend. */
router.get('/admin/home', postsCtrl.getAllPosts)

/* GET posts list home page for frontend. */
router.get('/', postsCtrl.getAllPosts_front)

/* POST new post */
router.post('/admin/addPost', multer, postsCtrl.createPost)

/* GET one post for backend */
router.get('/admin/editPost/:id', postsCtrl.getOnePost)

/* GET one post for frontend */
router.get('/:slug', postsCtrl.getOnePost_front)

/* UPDATE a post */
router.put('/admin/editPost/:id', postsCtrl.updatePost)

// DELETE route via post, because method in the delete form
router.post('/admin/home/:id', postsCtrl.deletePost)

/* Change image */
// route delete image via method get, href
router.get('/admin/deleteImage/:id', postsCtrl.deleteImage)
// and the route with image upload (to upload a new picture)
router.get('/admin/changeImage/:id', postsCtrl.changeImage)
// and the route update the image
router.post('/admin/changeImage/:id', multer, postsCtrl.updateImage)

module.exports = router
