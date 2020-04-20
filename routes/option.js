const express = require('express')
const router = express.Router()

const optionsCtrl = require('../controllers/options')

/* GET posts list home page for backend. */
router.get('/admin/options', optionsCtrl.getAllOptions)

module.exports = router
