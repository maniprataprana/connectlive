var mongoose = require('mongoose');			
var config = require('../config/config');	

// Mongoose promise library is deprecated. 
// Tell mongoose to use ES6 Promises instead.
mongoose.Promise = global.Promise;

// If the Node process receives a signal to terminate, 
// close the Mongoose connection before termination.
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Script Ended and Database default connection disconnected.');
    process.exit(0);
  });
});


exports.showMessageAndExitDB = function (message) {
 	console.log(message);
  mongoose.connection.close(function () {
    // console.log('Script Ended and Mongoose default connection disconnected.');
  });
 	process.exit(0);
 }


exports.connectDB = function () {
	// Create the database connection
	mongoose.connect(config.db);
	// If the connection throws an error
	mongoose.connection.on('error',function (err) {
	  console.log('Mongoose default connection error: ' + err);
	});
}
