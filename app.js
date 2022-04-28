const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')

const PORT = 3000
const app = express()

require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
  console.log(`URL-shortener is working on localhost:${PORT}`)
})