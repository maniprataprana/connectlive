
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var LinkedinStrategy = require('passport-linkedin').Strategy;
var config = require('config');
var User = mongoose.model('User');
var helper = require('./helper');

/**
 * Expose
 */

module.exports = new LinkedinStrategy({
    consumerKey: config.linkedin.clientID,
    consumerSecret: config.linkedin.clientSecret,
    callbackURL: config.linkedin.callbackURL,
    profileFields: [
      'id', 'first-name', 'last-name', 'email-address', 
      'picture-url', 'public-profile-url'
      ]
  },
  function (accessToken, refreshToken, profile, done) {
    // console.log('***profile******');
    // console.log(profile);
    User.findOne({ 'linkedin.id': profile.id }, function (err, user) {
      if (err) return done(err);
      var type = 'linkedin';
      if (user) return helper.handleUserFound(user, profile, type, done); 
      return helper.handleUserNotFound(profile, type, done);
    })
  }
);
