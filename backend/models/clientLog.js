
var mongoose = require('mongoose');

var errorTypes = ['exception', 'error', 'debug'];

/**
 * A generic DB collection to store all types of logs sent from a client for 
 * debugging different endpoint environments. In short, a place to store any 
 * kind of info. that would aid to debug what went wrong on a user's system 
 * while running the app. 
 * 
 * Each document will correspond to a single report generated on a user's 
 * machine with some added details from the server endpoint.
 */
var clientLog = new mongoose.Schema({
  type: { type: String, required: true, enum: errorTypes },
  userAgent: { type: String, required: true },
  location: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  details: {}
});

mongoose.model('ClientLog', clientLog);