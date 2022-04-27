const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

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


// 首頁
app.get('/', (req, res) => {
  res.render('index')
})

// create new URL(short)
app.post('/', (req, res) => {

  // 判斷是否有輸入網址
  if(!req.body.origianlUrl){
    return res.render('error')
  }
  // 產生隨機英數
  const finalRandomLetterArray = []
  for (let i = 0 ; i < 5 ; i++){
    let RandomLetter = ""
    // RandomLetter 是單一次的隨機英數
    RandomLetter = cutRandomLetter(getRandomNum(62))
    finalRandomLetterArray.push(RandomLetter)
    // finalRandomLetterArray 是取出的隨機英數(Array)
  }
  const finalRandomLetterString = finalRandomLetterArray.join()
  const finalRandomLetter = finalRandomLetterString.replace(/,/g,"")
  console.log('finalRandomLetter:',finalRandomLetter)
  // finalRandomLetter 是最後的隨機英數

  //判斷是否已經縮短過的網址
  
})

app.listen(PORT, () => {
  console.log(`URL-shortener is working on localhost:${PORT}`)
})

function getRandomNum(number){
  return Math.floor(Math.random() * number)  
}

function cutRandomLetter(randomNum){
  const numberAndLetter = 'qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKOLP1234567890'
  return numberAndLetter.charAt(randomNum)
}
