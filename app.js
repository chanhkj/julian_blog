var express = require('express')
var app = express()
// Mongoose stuff
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhose/julian_blog')
mongoose.Promise = global.Promise
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}))
// write my models here
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
})

var postSchema = new mongoose.Schema({

})

var commentSchema = new mongoose.Schema({

})


app.listen(4000)
console.log('server started ')
