
(function () {
"use strict";

var app = angular.module('adminApp', ['ng-admin']);

// Grab the injector to inject dependencies to the app.
// var injector = angular.injector(['ng', 'adminApp']);

// to use angular filters inside javascript 
// var $filter = injector.get('$filter');

app.config(function (NgAdminConfigurationProvider) {

  var baseURL = location.protocol + '//' + location.hostname + 
    (location.port ? ':' + location.port : '') + '/admin/'; 
  var nga = NgAdminConfigurationProvider; 
   // set the main API endpoint for this admin
  var app = nga.application('ConnectLive admin') // application main title
    .baseApiUrl(baseURL);



  // define all entities at the top to allow references between them

  // the API endpoint for user will be http://localhost:3000/users/:id
  // you can optionally customize the identifier used in the api ('id' by default)

  var user = nga.entity('users')
    .identifier(nga.field('_id'));
  
  var clientLog = nga.entity('client-logs')
    .identifier(nga.field('_id'));

  // set the application entities
  app
    .addEntity(user)
    .addEntity(clientLog);
  
  // function truncate(value) {
  //   if (!value) return '';
  //   return value.length > 50 ? value.substr(0, 50) + '...' : value;
  // }

  // function pagination(page, maxPerPage) {
  //   return {
  //     _start: (page - 1) * maxPerPage,
  //     _end: page * maxPerPage
  //   };
  // }


  /**
   * User Views
   */ 
  user.dashboardView()
    .title('Recent users')
    .order(1) // display the user panel first in the dashboard
    .limit(5) // limit the panel to the 5 latest users
    .fields([
      nga.field('name').isDetailLink(true),
      nga.field('email')
    ]);

  
  user.listView()
    .title('All users') // default title is "List of users"
    .description('All users in the app.')
    .perPage(30)
    // .infinitePagination(true)
    .fields([
      nga.field('name').isDetailLink(true), // the default list field type is "string", and displays as a string
      nga.field('email'),
      nga.field('roles'),
      nga.field('joinDate', 'date'),
    ]);
    // .filters([

    // ]);


  user.creationView()
    .title('Add a new user')
    .fields([
      nga.field('email'), 
      nga.field('password')
    ]);

  user.editionView()
    .title('Editing User {{ entry.values.name }}')
    .fields([
      nga.field('_id').editable(false),
      nga.field('name'),
      nga.field('username'),
      nga.field('email'),
      nga.field('roles'),
      nga.field('isActive', 'boolean'),
    ]);
  // user.deletionView()
  //   .title('Delete a user');


  /**
   * clientLog views
   */
  clientLog.listView()
    // .title('All users') // default title is "List of users"
    .description('Client logs to aid in dubugging')
    .perPage(30)
    // .infinitePagination(true)
    .fields([
      nga.field('timestamp', 'date').format('medium').isDetailLink(true),
      nga.field('type'),
      nga.field('userAgent'),
      nga.field('location'),
    ]);
    // .filters([

    // ]);

  clientLog.editionView()
    // .title('Editing User {{ entry.values.name }}')
    .fields([
      nga.field('_id').editable(false),
      nga.field('type').editable(false),
      nga.field('userAgent').editable(false),
      nga.field('location').editable(false),
      nga.field('timestamp', 'date').format('medium').editable(false),
      nga.field('details', 'json').editable(false),
    ]);

  clientLog.deletionView()
    .title('Delete a client log');


  nga.configure(app);

});

})();