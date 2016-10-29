var express = require('express')
var router = express.Router()

var Comment = require('../models/comment')

var Property = require('../models/property')

router.get('/', function (req, res) {
  res.render('users/about')
})

router.get('/', function (req, res) {
  if (!req.isAuthenticated())
  res.redirect('/login')
  Property.find({}, function (err, properties) {
    res.render('users/profile', {
      propertyArr: properties,
      message: req.flash('loginMessage')
    })
  })
})

// router.get('/profile', function(req, res) {
//   res.render('blog/article')
// })

// get route for new comment
router.get('/:id', function (req, res) {
  Property.findById(req.params.id, function (err, foundProperty) {
    if (err) console.log(err)
    Comment.find({
      property_id: req.params.id
    }, function (err, foundComments) {
      res.render('property/article', {
        foundProperty: foundProperty,
        commentArr: foundComments,
        currentUser:req.user.id,
        nowUser: req.user
      })
    })
  })
})

// post new comments
router.post('/:id', function (req, res) {
  console.log(req.body);
  var newComment = new Comment({
    commenterName: req.body.comment.commenterName,
    remarks: req.body.comment.remarks,
    property_id: req.params.id,
    user_id: req.user.id
  })
  newComment.save(function (err, savedComment) {
    // res.send(savedComment)
    res.redirect('/property/' + req.params.id)
  })
})

// foundComments.save(function (err, foundComments) {
// res.send(savedComment)
// res.redirect('/property/' + req.params.id)
// })

// router.get('/:id, function(req, res) {
//   Comment.findById({}, function(err, allArticles) {
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
