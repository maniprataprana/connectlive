var async = require('async');
var querystring = require('querystring');
var passport = require('passport');

var mongoose = require('mongoose');
var ClientLog = mongoose.model('ClientLog');

var applib = require('../applib');

exports.create = function(req, res) {
  // console.log('req.body: ', req.body);
  // console.log('req.headers:',req.headers);
  
  // store client log data in db

  var clientLog = new ClientLog();
  clientLog.userAgent = req.headers['user-agent'];
  clientLog.type = req.body.type;
  clientLog.location = req.body.location;
  clientLog.details = req.body.details;

  clientLog.save(function(err) {
    if(err) return applib.handleError(res, err);
    res.send({message: 'Got log data!'});
  });  

}


exports.list = function (req, res) {
    ClientLog.find({}, function(err, clientLogs) {
        if(err) return applib.handleError(res, err);
        res.json(clientLogs);    
    });
};
exports.get = function (req, res) {
    ClientLog.findOne({ _id: req.params.id }, function(err, clientLog) {
      if(err) return applib.handleError(res, err);
      if(!clientLog) return applib.DoesNotExist(res, 'ClientLog');
      res.json(clientLog);    
    });
};

exports.destroy = function (req, res) {
  ClientLog.findOne({ _id: req.params.id }, function(err, clientLog) {
    if(err) return applib.handleError(res, err);
    if(!clientLog) return applib.DoesNotExist(res, 'ClientLog');
    
    clientLog.remove(function(err) {
      if(err) return applib.handleError(res, err);
      res.json(clientLog);
    });
    
  });    
    
};
