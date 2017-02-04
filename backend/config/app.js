var bodyParser = require('body-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);

var expressValidator = require('express-validator');

// for rendering templates via almost any template engine in a unified way
var consolidate = require('consolidate');

// serve static files
var serveStatic = require('serve-static');

// series of middleware that help secure your Express/Connect apps.
var helmet = require('helmet');

// logging
var winston = require('winston');
var morgan = require('morgan'); 

var config = require('config');

var env = process.env.NODE_ENV || 'development';

module.exports = function (app, passport) {

  // for Server Template Rendering
  // assign the swig engine to .html files 
  app.engine('html', consolidate.swig);
  app.engine('txt', consolidate.swig);

  // set .html as the default extension
  app.set('view engine', 'html');
  
  // where to look for view files
  app.set('views', config.serverRoot + '/views');

  // help secure Express apps with various HTTP headers
  app.use(helmet());

  // serve static assets
  app.use(serveStatic(config.client.root));
  app.use(serveStatic(config.client.app));


    app.use(bodyParser.json());    
    app.use(bodyParser.urlencoded({ extended: true }));  
    
    app.use(expressValidator({
      customValidators: {
        
        notBlank: function(value) {
          if(!value) return 0;
          return value.trim().length;
        }
        
      }
      
    }));
    

    app.use(session({
      cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1day
      resave: true,
      saveUninitialized: true,
      secret: config.appName,
      store: new mongoStore({
        url: config.db,
        collection: 'sessions'
      })
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    
    
    // Use winston on production
    var log;
    if (env !== 'development') {
      log = {
        stream: {
          write: function (message, encoding) {
            winston.info(message);
          }
        }
      };
    } else {
      log = 'dev';
    }

    // Don't log during tests
    // Logging middleware
    if (env !== 'test') app.use(morgan(log));



    // Enable if using proxy
    // Enabling this setting has several subtle effects. 
    // The first is that X-Forwarded-Proto may be set by the reverse proxy 
    // to tell the app whether it is https or simply http. 
    // This value is reflected by req.protocol.
    // The second change is that the req.ip and req.ips values will be populated 
    // with X-Forwarded-For’s list of addresses.   
    // app.enable('trust proxy');



    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
    // allow cross-origin HTTP request 
    app.use(function(req, res, next) {
      // res.header("Access-Control-Allow-Origin", "*");
      // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      // // also allow prefligh requests (make changes to the resource)
      // res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,DELETE");
    
      // next();

      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
      if ('OPTIONS' === req.method) {
          res.sendStatus(200);
      } else {
          next();
      }    
      
      
      
    });  
    
    

};