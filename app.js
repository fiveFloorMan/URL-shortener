const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send(`We are working`)
})

app.listen(3000, () => {
  console.log(`URL-shortener is working on localhost:3000`)
})