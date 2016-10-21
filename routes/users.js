var express = require('express')
var router = express.Router()
var passport = require('passport')


var User = require('../models/user')

function authCheck(req, res, next) {
  if (req.isAuthenticated()) {
    req.flash('signupMessage', 'You have logged in')
    return res.redirect('/profile')
  } else {
    return next()
  }
}
router.route('/signup')
  .get(authCheck, function(req, res) {
    User.find({}, function(err, allUsers) {
      res.render('users/signup-passport', {
        allUsers: allUsers,
        message: req.flash('signupMessage')
      })
    })
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }))

router.route('/login')
.get(function (req, res) {
  res.render('users/login', {message:req.flash('loginMessage')})
})
.post(passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}))

router.get('/error', function (req, res) {
  res.render('users/error')
})

router.get('/profile', function (req, res) {
  res.send(req.user)

  res.render('users/profile', { message: req.flash('loginMessage') })
})

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})





module.exports = router
