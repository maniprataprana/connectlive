

var local = require('./passport/local');
var facebook = require('./passport/facebook');
var google = require('./passport/google');
var linkedin = require('./passport/linkedin');


module.exports = function (passport, mongoose) {

  var User = mongoose.model('User');
  
  passport.serializeUser(function(user, done) {
    // console.log('serializing...', user.id);
    done(null, user._id);
  });   
  
  passport.deserializeUser(function(id, done) {
    // console.log('deserializing...');
    User.findById(id, function (err, user) {
      done(err, user);
    });  
  });
    
  
  passport.use(local);  
  passport.use(facebook);  
  passport.use(google);  
  passport.use(linkedin);  
    
};