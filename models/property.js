var mongoose = require('mongoose')
  // var bcrypt = require('bcrypt')

var propertySchema = new mongoose.Schema({
  name: String,
  year: String,
  message: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comment_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }
})

var Property = mongoose.model('Property', propertySchema, 'property')

module.exports = Property
