const express = require('express')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', require('./router'))

const server = require('http').createServer(app)

module.exports = server
