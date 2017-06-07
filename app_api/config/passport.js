var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function (username, password, done) {
    //search MongoDB for user with supplied email address
    User.findOne({
      email: username
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      //if no user is found, return false and a message
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }

      //if password is incorrect, return false and a message
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }

      //if it got to the end, return user object
      return done(null, user);
    });
  }
));