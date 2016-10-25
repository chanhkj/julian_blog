var express = require('express')
var router = express.Router()

var Comment = require('../models/comment')

var Property = require('../models/property')

router.get('/', function(req, res) {
  Property.find({}, function(err, properties){
    res.render('users/profile', { message: req.flash('loginMessage'),
      propertyArr: properties
    })
  })
})

// router.get('/profile', function(req, res) {
//   res.render('blog/article')
// })

router.get('/:id', function(req, res){

 Property.findById(req.params.id, function(err, foundProperty){

if (err) console.log (err)

 res.render('property/article',{
   foundProperty: foundProperty
 })
 })
})

router.get('/', function(req, res) {
  Comment.find({}, function(err, comments){
    res.render('/:property_id', {
      message: req.flash('loginMessage'),
      commentArr: comments
    })
  })
})

router.post('/:id', function (req,res){

var newComment = new Comment ({
  commenterName: req.body.commenterName,
  remarks: req.body.remarks,
  propertyid: req.params.propertyid

})


newComment.save(function (err, savedComment){

res.send(savedComment)

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
