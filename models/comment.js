// comment model
var mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
  commenterName: String,
  remarks: String,
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

var Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
