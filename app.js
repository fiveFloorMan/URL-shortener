const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

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

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log(`URL-shortener is working on localhost:3000`)
})