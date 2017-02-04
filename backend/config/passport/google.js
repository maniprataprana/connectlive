
var mongoose = require('mongoose');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = mongoose.model('User');
var config = require('config');
var helper = require('./helper');

module.exports = new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,

    //   profileFields: [
    //     'id', 'displayName', 'email', 'photos'
    //   ]

    },
    function(accessToken, refreshToken, profile, done) {
      
      User.findOne({'google.id' : profile.id }, function(err, user) {
        if(err) return done(err);
        
        var type = 'google';
        if (user) return helper.handleUserFound(user, profile, type, done);
        return helper.handleUserNotFound(profile, type, done);
        
      });
            
    }
);
