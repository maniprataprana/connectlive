var async = require('async');
var querystring = require('querystring');
var passport = require('passport');

var mongoose = require('mongoose');
var User = mongoose.model('User');

var applib = require('../applib');
var config = require('config');


exports.allUsers = function(req, res) {
  User.find({}, function(err, users) {
    if(err) return applib.handleError(res, err);
    
    res.render('all-users', {
      'users': users,
      'domain': req.hostname,
      'appName': config.appName
    });
  
  });

};

function loginAndRespond(req, res, user, urlParams) {
  console.log('redirectUrl (loginAndRespond): ', req.session.authRedirect);

  req.login(user, function(err) {
    if(err) return applib.handleError(res, err);
    
    // fetch any redirects & clear it from session 
    // if there is no redirect provided, a default is added by 
    // storeAuthRedirect middleware. 
    var redirectUrl = req.session.authRedirect;
    delete req.session.authRedirect;
      
    if (req.xhr)
      return res.json({ redirectUrl: redirectUrl });
    else
      return res.redirect(redirectUrl);      
         
  });

}

exports.handleAuthLogin = function(strategy, req, res, next) {
  console.log('inside handleAuthLogin..');
  passport.authenticate(strategy, function(err, user, info) {
    if(err) {
      console.log('error authenticating user: ', err);
      return next(err); // can we not handle the error?
    }
    
    if(!user)
      return res.status(400).json({'status': 'error', 'message' : info.message });
    
    loginAndRespond(req, res, user);

  })(req, res, next);
  
};

function buildUserData(req, done) {
  var user = req.user;
  if (!user) return  done(null);
  
  var userData = {};
  userData._id = user._id;
  userData.name =  user.name.split(' ')[0];
  userData.username = user.username;
  userData.email =  user.email;
  userData.image =  user.displayPhoto ? user.displayPhoto.photo : '';
  userData.emailVerified = user.emailVerified;
  userData.isAdmin = user.isAdmin();
  done(null, userData);
}



exports.currentUser = function(req, res) {
  buildUserData(req, function(err, data) {
    if (err) return applib.handleError(res, err);
    return res.json({ user: data });
  });
};

exports.logout = function(req, res) {
  req.logout();
  res.status(200).send('Logged out');
};

// CRUD operations
function createUser (req, res, done) {
  // req.assert('name', 'Name is Required').notBlank();
  req.assert('email', 'Email is Required').isEmail();
  req.assert('password', 'Password cannot be blank').notBlank();    
  req.assert('password', 'Password must be between 6 and 40 characters').len(6,40);  

  var errors = req.validationErrors();
  
  if(errors) return res.status(400).send(errors);

  var user = new User();
  user.name = req.body.email.split('@')[0];
  user.email = req.body.email;
  user.password = req.body.password;
  
  user.save(function(err) {
    if(err) return done(err);
    done(null, user);
  });
};

exports.createWithoutLogin = function (req, res) {
  createUser(req, res, function(err, user) {
    if (err) return applib.handleError(res, err);
    res.json(user);
  });
};

exports.createAndLogin = function(req, res) {
  async.waterfall([
    function(callback) {
      createUser(req, res, function(err, user) {
        if (err) return applib.handleError(res, err);
        callback(null, user);    
      });
    },
    function(user, callback) {
      loginAndRespond(req, res, user);
    }
  ]);

};

exports.list = function (req, res) {
    User.find({}, function(err, users) {
        if(err) return applib.handleError(res, err);
        res.json(users);    
    });
};
exports.get = function (req, res) {
    User.findOne({ _id: req.params.id }, function(err, user) {
      if(err) return applib.handleError(res, err);
      if(!user) return applib.DoesNotExist(res, 'User');
      res.json(user);    
    });
};

exports.update = function (req, res) {
  console.log('req.body: ', req.body);
  User.findOne({ _id: req.params.id }, function(err, user) {
    if(err) return applib.handleError(res, err);
    if(!user) return applib.DoesNotExist(res, 'User');
    
    user.name = req.body.name;
    user.save(function(err) {
      if(err) return applib.handleError(res, err);
      res.json(user);
    });
    
  });    
    
};

exports.destroy = function (req, res) {
  User.findOne({ _id: req.params.id }, function(err, user) {
    if(err) return applib.handleError(res, err);
    if(!user) return applib.DoesNotExist(res, 'User');
    
    user.remove(function(err) {
      if(err) return applib.handleError(res, err);
      res.json(user);
    });
    
  });    
    
};


exports.testMail = function(req, res) {
  
  User.findOne({email: '2anandkr@gmail.com'}, function(err, user) {
    if(err) return applib.handleError(res, err);
    if(!user) return applib.DoesNotExist(res, 'User');
    
    var mailData = {
      body: 'welcome',
      subject: 'Testing..',
      context: { name: user.name }
    };
    applib.sendMail(res, user, mailData, function (err, success) {
      if (err) return applib.handleError(res, err);
      res.send(success);
    });
  
  });
  
  
};