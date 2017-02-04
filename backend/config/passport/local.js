
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne( {email: email}, function (err, user) {
     if(err) return done(err);
     if(!user) {
       return done(null, false, { message: 'This User Does Exist!' });
     }
     if(!user.authenticate(password)) {
       return done(null, false, { message: 'Invalid Password'});
     }
     return done(null, user);
    
    });
    
  }
  
);