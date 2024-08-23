'use strict'

const router = require('express').Router()
const { readMany, readOne } = require('../controllers/articles.controller')

router.route('/').get(readMany)
router.route('/:id').get(readOne)

module.exports = router
