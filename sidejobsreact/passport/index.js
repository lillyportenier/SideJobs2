var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy(
    function(email, password, done) {
        User.findOne({ email: email }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());