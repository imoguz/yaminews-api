'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const packagejson = require('./package.json')
const PORT = 8000

// ------- error handler -------
require('express-async-errors')

// ----- .env variables -----
require('dotenv').config()

// ----- Convert to JSON -----
app.use(bodyParser.json())

// ----- cors for all requiest -----
app.use(require('cors')())

// to test cron job locally
// const saveNewsApiArticles = require('./api/saveNewsApi')
// const saveCurrentsApiArticles = require('./api/saveCurrentsApi')

// import Cron job
app.use('/api/saveNewsApi', (req, res) => saveNewsApiArticles(req, res))
app.use('/api/saveCurrents', (req, res) => saveCurrentsApiArticles(req, res))

// ----- routes -----
app.use('/yaminews/api/v1', require('./src/routes/index'))

// ----- main path -----
app.all('/', (req, res) => {
  res.send({
    message: 'Welcome to ' + packagejson.name,
  })
})

// ----- Error Handler -----
app.use(require('./src/middlewares/errorHandler'))

// ----- listenning server -----
app.listen(PORT, () => console.log('Server is running on port', PORT))
