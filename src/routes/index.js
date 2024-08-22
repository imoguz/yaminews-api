'use strict'

const router = require('express').Router()

router.use('/newsapi/articles', require('./newsapi.route'))

module.exports = router
