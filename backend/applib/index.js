
var async = require('async');
var config = require('config');
var sendgrid = require('sendgrid')(config.sendgrid_api_key);


exports.DoesNotExist = function(res, resource) {
    return res.status(404).json('This ' + resource + ' Does Not Exist!');
}


exports.handleError = function (res, error) {
	res.status(500);
	var errorResponse = {'status': 'error'};
	if (error.stack) 
		delete error['stack'];
	errorResponse.error = error.toString();
	console.log(error.toString());
	return res.send(errorResponse);
};

function renderEmailTemplates(res, context, viewToRender, done) {
 
 var txtView = viewToRender + '.txt'; 
 var htmlView = viewToRender + '.html'; 
 
 async.waterfall([
   
   // render the text file with context
   function(callback) {
     
    res.render(txtView, context, function(err, renderedText) {
      if(err) return callback(err);
      callback(null, renderedText);
    });
    
   },
   function(renderedText, callback) {
  
    res.render(htmlView, context, function(err, renderedHtml) {
      if (err) return callback(err);
      done(null, renderedText, renderedHtml);
    });

   }
  ], function(err) {
    if(err) return  done(err);
  });
  
}


    // var mailData = {
    //   body: 'welcome', 
    //   context: { name: user.name },
    //   subject: 'Testing',
    // };


exports.sendMail = function (res, user, mailData, done) {
  
  async.waterfall([
    // get rendered body templates
    function(callback) {
      var context = mailData.context || {};
      context.appName = config.appName;
      context.domain = config.domain;
      
      if(!mailData.body || !mailData.subject) {
        return done(new Error('Missing the body template and subject'));
      }

      renderEmailTemplates(res, context, mailData.body, 
        function (err, renderedText, renderedHtml) {
          if(err) return done(err);
          
          callback(null, renderedText, renderedHtml);
      })      
    },
    // send mail
    function(renderedText, renderedHtml, callback) {
      var email = new sendgrid.Email({
        from: mailData.fromEmail || config.mailer.fromNoReply,
        fromname: mailData.fromName || config.appName,
        subject: mailData.subject,
        text: renderedText,
        html: renderedHtml
      })
      email.setSmtpapiTos([user.email]);
      sendgrid.send(email, function (err, json) {
        console.log('sendgrid mail response: ', err, json);
        if(err) return done(err);
        return done(null, json);
      });
      
    }
    
  ]);
  

}

