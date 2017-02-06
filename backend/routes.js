var users = require('./controllers/users');
var clientLogs = require('./controllers/clientLogs');

var path = require('path');
var express = require('express');

var config = require('config');


module.exports = function (app, passport) {

  /**
   * COMMON MIDDLEWARES
   */
  
  // Delays executing any route for certain duration. 
  // Useful while testing. 
  function delayResponse(req, res, next) {
    setTimeout(next, 3000);	
  };

  // only allows access to a route if user is logged in. 
  function loginRequired(req, res, next) {
    if (!req.isAuthenticated())
      return res.status(401).send('Anonymous User! Not Authorised.');
    next();
  };
  
  // only allows access to a route if user is an admin.
  function isAdmin(req, res, next) {
    if (!req.user.isAdmin())	
      return res.status(403).send('Admin permission required!');
    next();
  };    

  // will fetch next query parameter from url(if found) as in: 
  // url/?next='/any/url'    
  function storeAuthRedirect(req, res, next) {
    req.session.authRedirect = req.query.next || '/';
    next();
  }


  // creating custom routers to handle admin & api routes separately
  var adminRouter = express.Router();
  app.use('/admin', adminRouter);

  var apiRouter = express.Router();
  app.use('/api', apiRouter);

  // load the ng-admin app on /admin
  adminRouter.get('/', 
    function(req, res, next) {
      if(!req.isAuthenticated()) {
        return res.redirect('/auth?next=/admin');
      } else {
        next();
      }
    }, 
    function(req, res) {
      res.sendFile(path.join(config.client.root, 'admin-app', 'admin.html'));
  });

	// admin routes are only accesible to users who are logged-in and 
  // have admin permission 
	adminRouter.all('*', loginRequired, isAdmin);
	// apiRouter.all('*', delayResponse);

  app.get('/auth', storeAuthRedirect, function(req, res) {
    res.sendFile(path.join(__dirname, 'auth-login.html')); 
  });
    
  app.get('/testmail', users.testMail);  
  app.get('/all-users', users.allUsers);
  
  //
  // admin routes: User
  //
  adminRouter.post('/users', users.createWithoutLogin);
  adminRouter.get('/users', users.list);
  adminRouter.get('/users/:id', users.get);
  adminRouter.delete('/users/:id', users.destroy);

  //
  // public routes: User
  //
  apiRouter.post('/users', storeAuthRedirect, users.createAndLogin);  
  apiRouter.get('/users', users.list);  
  apiRouter.get('/users/:id', users.get); 
  apiRouter.put('users/:id', users.update);
     
  apiRouter.get('/users/auth/logout', users.logout);
  apiRouter.get('/currentuser', users.currentUser);

  //
  // authentication routes
  //
  apiRouter.post('/users/auth/login', storeAuthRedirect, function(req, res, next) {
      users.handleAuthLogin('local', req, res, next);
  });

  apiRouter.get('/users/auth/facebook', 
    storeAuthRedirect,
    passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
  );
  
  apiRouter.get('/users/auth/facebook/callback', function(req, res, next) {
    users.handleAuthLogin('facebook', req, res, next);
  });

  apiRouter.get('/users/auth/google', 
    storeAuthRedirect,
    passport.authenticate('google', { scope: ['email', 'profile'] })
  );
  
  apiRouter.get('/users/auth/google/callback', function(req, res, next) {
    users.handleAuthLogin('google', req, res, next);
  });

  apiRouter.get('/users/auth/linkedin', 
    storeAuthRedirect,
    passport.authenticate('linkedin', { 
      scope: ['r_basicprofile', 'r_emailaddress'] 
    })
  );
  
  apiRouter.get('/users/auth/linkedin/callback', function(req, res, next) {
    users.handleAuthLogin('linkedin', req, res, next);
  });

  //
  // admin routes: clientLogs
  //    
  adminRouter.get('/client-logs', clientLogs.list);
  adminRouter.get('/client-logs/:id', clientLogs.get);
  adminRouter.delete('/client-logs/:id', clientLogs.destroy);

  //
  // public routes: clientLogs
  //
  apiRouter.post('/client-logs', clientLogs.create);


};