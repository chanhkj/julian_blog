var express = require('express')
var router = express.Router()

var Comment = require('../models/comment')

var Property = require('../models/property')

router.get('/', function (req, res) {
  Property.find({}, function (err, properties, comments) {
    res.render('users/profile', {
      message: req.flash('loginMessage'),
      propertyArr: properties,
    })
  })
})

// router.get('/profile', function(req, res) {
//   res.render('blog/article')
// })

router.get('/:id', function (req, res) {
  Property.findById(req.params.id, function (err, foundProperty) {
    if (err) console.log(err)
    Comment.find({property_id : req.params.id}, function(err, foundComments){
      res.render('property/article', {
        foundProperty: foundProperty,
        commentArr: foundComments
      })
    })
  })
})

// router.get('/', function(req, res) {
//   Comment.find({}, function(err, comments) {
//     res.render('/:property_id', {
//       message: req.flash('loginMessage')
//     })
//   })
// })

router.post('/:id', function (req, res) {
  var newComment = new Comment({
    commenterName: req.body.commenterName,
    remarks: req.body.remarks,
    property_id: req.params.id
  })

  newComment.save(function (err, savedComment) {
    // res.send(savedComment)
    res.redirect('/property/' + req.params.id)
  })
})

// router.get('/property', function(req, res) {
//   Article.find({}, function(err, allArticles) {
//     console.log(allArticles)
//     res.render('/profile', {
//       allArticles: allArticles
//     })
//   })
// })
//
// router.post('/profile', function(req, res){
//   Article.create(req.body.article, function (err, task) {
//    if (err) {
//      res.send('an err during creation' + err)
//    } else {
//      // res.redirect('/profile')
//        res.send('successful')
//        // res.redirect('/')
//    }
//  })
// })

module.exports = router
