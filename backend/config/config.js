
var fs = require('fs');
var path = require('path');
var serverRoot = path.normalize(__dirname + '/..');

var projectRoot = path.join(serverRoot, '/..');
var clientRoot = path.join(projectRoot, 'frontend');

/**
 * Load Environment Variables from a JSON file. 
 * Note: This files should not be versioned controlled. 
 */
var envFile = serverRoot + '/.env.json';

if(fs.existsSync(envFile)) {
  
  var env = fs.readFileSync(envFile, 'utf-8');

  env = JSON.parse(env);
  Object.keys(env).forEach(function (key) {
    process.env[key] = env[key];
  });

}

// First load all environment variables & then require any env. specific config.
var development = require('./env/development');
var production = require('./env/production');
var test = require('./env/test');


var defaults = {
  serverRoot: serverRoot,
  appName: 'Live Expert',
  domain: 'expertonlive.com',
  client: {
    root: clientRoot,
    app: path.join(clientRoot, 'dist')
  },
  sendgrid_api_key: process.env.SENDGRID_API_KEY,
  
  mailer: {
   fromNoReply: '<no-reply@expertonlive.com>',
   support: '<support@expertonlive.com>'
  }
  
};


module.exports = {
  development: Object.assign(development, defaults),
  production: Object.assign(production, defaults),
  test: Object.assign(test, defaults)
}[process.env.NODE_ENV || 'development'];
