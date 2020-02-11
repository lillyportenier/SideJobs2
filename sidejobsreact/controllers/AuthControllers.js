var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render('/', { user : req.user });
};

// Go to registration page
userController.register = function(req, res) {
  res.render('signup');
};

// Post registration
userController.doRegister = function(req, res) {
  User.register(new User({ firstName : req.body.firstName, lastName: req.body.lastName, phoneNumber : req.body.phoneNumber, email :  req.body.email, zip : req.body.zip, city : req.body.city}), req.body.password, function(err, user) {
    if (err) {
      return res.render('signup', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

// Go to login page
userController.login = function(req, res) {
  res.render('signin');
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = userController;