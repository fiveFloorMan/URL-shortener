const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/URL-shortener-of-harvie')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongoose error')
})

db.once('open', () => {
  console.log('mongoose connect')
})

module.exports = db