
var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = mongoose.model('User');
var config = require('config');
var helper = require('./helper');

module.exports = new FacebookStrategy(
    {
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
      profileFields: [
        'id', 'displayName', 'email', 'photos'
      ]
    },
    function(accessToken, refreshToken, profile, done) {
      
      User.findOne({'facebook.id' : profile.id }, function(err, user) {
        if(err) return done(err);
        
        var type = 'facebook';
        if (user) return helper.handleUserFound(user, profile, type, done);
        return helper.handleUserNotFound(profile, type, done);
        
      });
            
    }
);
