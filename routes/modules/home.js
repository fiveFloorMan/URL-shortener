const express = require('express')
const router = express.Router()
const PORT = 3000

const URL = require('../../models/Url')

// 首頁
router.get('/', (req, res) => {
  res.render('index')
})

// create new URL(short)
router.post('/', (req, res) => {

  // 判斷是否有輸入網址
  if(!req.body.originalUrl){
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
  // finalRandomLetter 是最後的隨機英數

  //判斷是否已經縮短過的網址
  const originalUrl = req.body.originalUrl
  URL.findOne({ originalUrl })
    .lean()
    .then(url => {
      if(url){ 
        // 如果已經有舊的資料
        return res.render('index', {value: url.shorterUrl})
      } else {
        // 如果沒有舊資料就直接成立新資料
        URL.create({
          originalUrl: originalUrl,
          shorterUrl: `localhost${PORT}/${finalRandomLetter}`
        })
        .then((url) => {
          return res.render('index', {value: url.shorterUrl})
        })
      }
    })
    .catch(error => console.log(error))    
})

module.exports = router

// 取得亂數
function getRandomNum(number){
  return Math.floor(Math.random() * number)  
}
// 依照亂數取得英數
function cutRandomLetter(randomNum){
  const numberAndLetter = 'qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKOLP1234567890'
  return numberAndLetter.charAt(randomNum)
}
