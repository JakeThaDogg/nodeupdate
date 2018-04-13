var express = require('express')
var router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'tmp/' })
const fs = require('fs')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('coucou-pug', { sayHello: 'Hello buddy', title: 'Yolo' })
})

router.get('/superMiddleware', function (req, res, next) {
  console.log('hello middleware')
  next()
},
function (req, res, next) {
  res.send('hello world')
})

router.get('/upload', function (req, res, next) {
  res.render('upload')
})

router.post('/uploaddufichier', upload.array('fileup', 3), function (req, res, next) {
//  console.log(req.files)
  for (var i = 0; i < req.files.length; i++) {
    let file = req.files[i]
    console.log(file.originalname)
    if (req.files.length > 3) {
      res.send('Vous ne pouvez pas envoyer plus de 3 fichiers')
    } else if (file.size > 300000) {
      res.send('L\'un des fichiers est supérier à 3mo ')
    } else if (file.mimetype !== 'image/png') {
      console.log(file.mimetype)
      res.send('L\'un des fichiers n\'est pas un png')
    } else {
      fs.rename(file.path, 'public/images/' + file.originalname)
    }
  }
  res.send('ok')
})
/*
  fs.rename(path, 'public/images/' + req.files.originalname, function (err) {
    if (err) {
      res.send('problème durant le déplacement')
    } else {
      res.send('Fichier uploadé avec succès')
    }
  })
})
/*

router.get('/askForCookiesRecipe', function (req, res, next) {
  let transporter = nodemailer.createTransport({})
    service: 'Gmail',
    auth: {
      user: 'poirier.dev@gmail.com',
      pass: ''
    }
  })

  transporter.sendMail({
    from: 'Da MVP Wildr <poirier.dev@gmail.com',
    to: 'supergrandma@yopmail.com',
    subject: 'Give me your cookie recipe pls',
    text: 'pls',
    html: '<i>pls I\'ve been a good boy recently</i>'
  }, (error, response) => {
      if (error) {
          console.log(error)
      } else {
          console.log("Message sent: " + response.message)
      }
  })

  res.render('recipe', { giveRecipe: 'Dont fuk wit me', title: 'hello grandma'})
})

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'poirier.dev@gmail.com',
    pass: ''
  }
})

transporter.sendMail({
  from: 'Da MVP Wildr <poirier.dev@gmail.com',
  to: 'supergrandma@yopmail.com',
  subject: 'Give me your cookie recipe pls',
  text: 'pls',
  html: '<i>pls I\'ve been a good boy recently</i>'
}, (error, response) => {
    if (error) {
        console.log(error)
    } else {
        console.log("Message sent: " + response.message)
    }
})
*/

router.post('/forms-:num(\\d+)', (req, res) => {
  console.log(req.params.num)
  console.log(req.query.level)
  console.log(req.body.username)
})

module.exports = router
