const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')
// const URL = require('./models/Url')

const PORT = 3000
const app = express()

mongoose.connect('mongodb+srv://alpha:camp@cluster0.ow72u.mongodb.net/URL-shortener?retryWrites=true&w=majority')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongoose error')
})

db.once('open', () => {
  console.log('mongoose connect')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`URL-shortener is working on localhost:${PORT}`)
})