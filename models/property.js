var mongoose = require('mongoose')
// var bcrypt = require('bcrypt')

var propertySchema = new mongoose.Schema({
    name: String,
    year: String,
    message: String

})

var Property = mongoose.model('Property', propertySchema, 'property')

module.exports = Property
