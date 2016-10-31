// comment route (where i edit and delete post)
var express = require('express')
var router = express.Router()

var Comment = require('../models/comment')

var Property = require('../models/property')

// edit comments route
router.get('/:id/edit', function(req, res) {
    Comment.findById(req.params.id, function(err, foundComment) {
      if (err) console.log(err)
      else {
        console.log(foundComment)
        res.render('./property/edit', {
          // foundProperty: foundProperty,
          foundComment: foundComment
        })
      }
    })
  })
  // post edit comments
router.put('/:id/edit', function(req, res) {
  var updatedComment = req.body.comment;
  console.log("what is this" + updatedComment)
  Comment.findByIdAndUpdate(req.params.id, updatedComment, {new:true}, function(err, foundComments) {
    if (err) throw new Error(err)
    console.log(foundComments)
    res.redirect('/property/' + foundComments.property_id)
  })
})

router.delete('/:property_id/comments/:id', function(req, res) {
  console.log("in delete");
  console.log("user id is" + req.user._id)
  Comment.findByIdAndRemove({user_id: req.user_id}, function(err, deleteComment) {
    if (err) {
      res.send('Error!')
      // console.log("delete" + deleteComment)
    } else {
      // console.log(deleteComment)
      res.redirect('/property/' + req.params.property_id)
    }
  })
})







module.exports = router
