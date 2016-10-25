var express = require('express')
var router = express.Router()
var passport = require('passport')

var Property = require('../models/property')

var User = require('../models/user')

function authCheck (req, res, next) {
  if (req.isAuthenticated()) {
    req.flash('signupMessage', 'You have logged in')
    return res.redirect('/profile')
  } else {
    return next()
  }
}

router.route('/signup')
  .get(authCheck, function (req, res) {
    User.find({}, function (err, allUsers) {
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
    res.render('users/login', {
      message: req.flash('loginMessage')
    })
  })
  .post(passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }))

// router.get('/error', function (req, res) {
  //   res.render('users/error')
  // })

// router.get('/profile', function(req, res) {
  //   res.render('users/profile', {
  //     message: req.flash('signupMessage')
  //   })
  // })

router.route('/login')
  .get(authCheck, function (req, res) {
    res.render('users/login', {
      message: req.flash('loginMessage')
    })
  }).post(passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}))

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated())
    return next()
  res.redirect('/login')
}

router.get('/profile', isLoggedIn, function (req, res) {
  Property.find({}, function(err, properties){

  // res.send(req.user)
  // find all posts here, render back to the profile page to read it out.

  res.render('users/profile', {
    message: req.flash('loginMessage'),
    propertyArr: properties
  })
})
})

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})

module.exports = router
