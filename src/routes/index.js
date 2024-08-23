'use strict'

const router = require('express').Router()

router.use('/articles', require('./articles.route'))

module.exports = router
