const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const rests = require('./modules/rests')

router.use('/', home)
router.use('/restaurants', rests)

module.exports = router