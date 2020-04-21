const express = require('express')
const router = express.Router()

const optionsCtrl = require('../controllers/options')

/* GET options. */
router.get('/admin/options', optionsCtrl.getAllOptions)

/* UPDATE options. */
router.put('/admin/options/:id', optionsCtrl.updateOptions)

module.exports = router
