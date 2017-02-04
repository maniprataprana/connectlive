#!/usr/bin/env node

// Can be improved with some external modules.

var mongoose = require('mongoose');			
var cli = require('./cli');

// Bring in the User Schema & load the model.		
require('../models/user'); 		
var User = mongoose.model('User');


function makeAdmin (email) {
	if (!email.length) {
		return cli.showMessageAndExitDB('Please enter the user\'s email to grant admin permission!');
	}
	else {				
		cli.connectDB();
		User.findOne({ email: email }, function(err, user) {
			if (err) return cli.showMessageAndExitDB('***error***\n', err);
			if(!user)	return cli.showMessageAndExitDB('Sorry! Unable to Find Any User With This Email.');
			if (!user.hasRole('admin')) {
				user.roles.push('admin');
				user.save(function (err) {
					if (err) return cli.showMessageAndExitDB('Encountered Error while Saving: \n', err);
					cli.showMessageAndExitDB('User ' + user.name + ' ('+ user.email + ') is now an admin!');
				});
			} else {
				cli.showMessageAndExitDB('User ' + user.name + ' ('+ user.email + ') is already an admin!');
			}
		});
	}
}


var argv = process.argv;

var usageInfo = 
	'\n'+
	'Usage: [<environment>] grant-admin-permission.js <argument> \n'+
	'environment: \n'+
	'  NODE_ENV\tSet running environment for this script. \n\t\tDefault: NODE_ENV=development'+
	'\nargument: \n'+
	'  <email> \tUser\'s email \n'+
	'  --help | --h \tShow this usage instruction'+
	'\n';

if (argv.length > 3) {
	console.log('**Only one argument is allowed! Check Out!**'); 
	console.log(usageInfo);
}
if (argv.length < 3) { 
	console.log(usageInfo);
}
if (argv.length === 3) {
	var argument = argv.slice(2);
	var re = /^\-/; // anything that begins with a -
	var helpOptions = ['--help', '--h'];	
	if (helpOptions.indexOf(argument.toString()) !== -1) { 
		console.log(usageInfo);
	} else if (argument.toString().search(re) !==-1) {
		console.log('**Sorry! You are not using me correctly! GET IT RIGHT!**');
		console.log(usageInfo);
	}
	else { 
		makeAdmin(argument); 
	}
}
