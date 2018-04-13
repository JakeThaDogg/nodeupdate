var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/:input', function (req, res, next) {
  if (isNaN(req.params.input)) {
    res.render('update-user', {input: req.params.input})
  } else {
    res.render('delete-user', {input: req.params.input})
  }
})

router.put('/:input', function (req, res, next) {
  res.send('the new name is ' + req.body.input)
})

router.put('/:name', function (req, res, next) {
  res.send('Hi ! My name is ' + req.params.name)
})

router.delete('/:input', function (req, res, next) {
  res.send('No more user with ID ' + req.params.input)
})

module.exports = router
