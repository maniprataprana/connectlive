var async = require('async');
var diff = require('deep-diff').diff;

var mongoose = require('mongoose');
var User = mongoose.model('User');

function fetchProfilePhoto(profile) {
  var newPhoto = null;
  
  if(profile.photos) {
    newPhoto = profile.photos[0].value;
  } else if(profile._json.picture) { // google
    newPhoto = profile._json.picture;
  } else if(profile._json.pictureUrl) { // linkedin
    newPhoto = profile._json.pictureUrl;
  }

  return newPhoto;

}


function checkAndUseThisProfilePhoto(user, profile, type) {
  
  var profilePhoto = fetchProfilePhoto(profile);
  
  if(profilePhoto) {
    var buildPhoto = false;
    
    if(!user.displayPhoto) {
      buildPhoto = true;
    } else if(user.displayPhoto.photo !== profilePhoto) {
      buildPhoto = true;
    }
    
    if(buildPhoto) {
      return {
        type: type,
        photo: profilePhoto
      }
    }
    
  }
  
  return null;
}


function handleUserFound(user, profile, type, done) {
 
 var saveUser = false;
 
  // only store profile photo or update if one does not exist
   var thisProfilePhoto = checkAndUseThisProfilePhoto(user, profile, type);
   if(thisProfilePhoto) {
     user.displayPhoto = thisProfilePhoto;
     saveUser = true;
   }
 
  //if email matches but not verified, mark as verified
  if(profile.emails[0].value === user.email && !user.isEmailVerified) {
    user.isEmailVerified = true;
    saveUser = true;
  }
  
  // uodate if any of the stored social data (object) changes
  if(diff(profile._json, user[type])) {
    user[type] =  profile._json;   
    saveUser = true;
  }
  
  if(saveUser) {
    user.save(function (err) {
      if(err) return done(err);
      done(null, user);
    })
  } else {
    process.nextTick(done, null, user);
  }

}

function handleUserNotFound(profile, type, done) {
 
 async.waterfall([
  
  function(callback) {
    User.findOne( { email: profile.emails[0].value  }, function (err, user) {
      if(err) return done(err);
      
      callback(null, user);
  
    });
  },
  
  function(user, callback) {
    if(!user) {
      user = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        isEmailVerified: true
      });
    } else if (!user.emailVerified) {
      user.isEmailVerified = true;
    }
    
    user[type] = profile._json;
    
    var thisProfilePhoto = checkAndUseThisProfilePhoto(user, profile, type);
    if(thisProfilePhoto) {
      user.displayPhoto = thisProfilePhoto;
    }
    
    user.save(function(err) {
      if(err) return done(err);
      done(null, user);
    });
    
  }
    
  ]);
 
}

exports.handleUserFound = handleUserFound;
exports.handleUserNotFound = handleUserNotFound;

