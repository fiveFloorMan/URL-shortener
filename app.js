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

// 首頁
app.get('/', (req, res) => {
  res.render('index')
})

// create new URL(short)
app.post('/', (req, res) => {
  const finalRandomLetter = []
  for (let i = 0 ; i < 5 ; i++){
    let RandomLetter = ""
    RandomLetter = cutRandomLetter(getRandomNum(62))
    finalRandomLetter.push(RandomLetter)
  }
  console.log('finalRandomLetter:', finalRandomLetter)
})

app.listen(3000, () => {
  console.log(`URL-shortener is working on localhost:3000`)
})

function getRandomNum(number){
  return Math.floor(Math.random() * number)  
}

function cutRandomLetter(randomNum){
const numberAndLetter = 'qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKOLP1234567890'
return numberAndLetter.charAt(randomNum)
}
