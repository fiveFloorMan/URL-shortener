const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  // 原始網址
  originalUrl: {
    type: String,
    required: true
  },
  // 縮短網址
  shorterUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('URL', urlSchema)