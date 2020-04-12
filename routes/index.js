const express = require('express')
const router = express.Router()

const postsCtrl = require('../controllers/posts')

/* GET home page. */
router.get('/', postsCtrl.getAllPosts)

module.exports = router
