var fs = require('fs');
var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

var config = require('config');
// console.log('config: ', config);

var app = express();
var server = http.createServer(app);

var host = process.env.IP || '0.0.0.0';
var port = process.env.PORT || 3000;


if (process.env.NODE_ENV !== 'test') {

  /** 
   * Setup DB Connection with Mongoose
   */

  var connect = function () {
    var options ={ server: { socketOptions: { keepAlive: 10 } } };
    mongoose.connect(config.db, options);
  };
  connect();

  mongoose.connection.on('connected', function() {
    console.log('db connected');
  });
  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);

}

// Mongoose promise library is deprecated. 
// Tell mongoose to use ES6 Promises instead.
mongoose.Promise = global.Promise;

// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function(file) {
  if(file.indexOf('.js') !== -1) {
    require(__dirname + '/models/' + file);
  }
});

// Bootstrap application settings
require('./config/app')(app, passport);

// Bootstrap routes
require('./routes')(app, passport);

// Bootstrap passport config
require('./config/passport')(passport, mongoose);


/**
 * Listen on the Server
 */


if (require.main === module) {
	server.listen(port, host, function () {
	  var boundAddress = server.address();
	  console.log('server listening on ' + boundAddress.address + ':' + boundAddress.port);
	});	
} else {
	// for testing
	module.exports = server;	
}

