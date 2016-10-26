var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var override = require('method-override')

var flash = require('connect-flash')
var session = require('express-session')

var passport = require('passport')
var MongoStore = require('connect-mongo')(session)

var dotenv = require('dotenv')


// Mongoose stuff
var mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/julian_blog')
mongoose.Promise = global.Promise

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.' + process.env.NODE_ENV })

mongoose.connect(process.env.MONGO_URI)

app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(layout)
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoReconnect: true
  })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// serve static files
app.use(express.static(__dirname + '/public'))

var userRoutes = require('./routes/users')
// var usersAPIRoutes = require('./routes/users_api')

var propertyRoutes = require('./routes/properties')

app.use(bodyParser.urlencoded({
  extended: true
}))

require('./config/passport')(passport)

app.use('/', userRoutes)
// app.use('/api/users', usersAPIRoutes)
app.use('/property', propertyRoutes)

app.listen(process.env.PORT || 4000)
console.log('server started ')
