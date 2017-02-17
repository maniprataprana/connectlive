import angular from 'angular';

import ngMessage from 'angular-messages';
import ngSanitize from 'angular-sanitize';

// import 3rd party modules
import uiRouter from 'angular-ui-router';
import loader from 'angular-loading-bar';
import toaster from 'angularjs-toaster';

// import app. modules
import { CommonModule } from './common/common.module';
import { ComponentsModule } from './components/components.module';

// import components
import { AppComponent } from './app.component';

// import interceptors
import { InjectApiUrlInterceptor } from './app.interceptors';

import 'script-loader!jquery'
import 'script-loader!what-input'
import 'script-loader!foundation-sites';

// import styles
import 'angular-loading-bar/build/loading-bar.css'; 
import 'angularjs-toaster/toaster.css'; 

import './app.scss';


$(document).ready(function ($) {
  $(document).foundation();
});

export const AppModule = angular
  .module('app', [
    ngSanitize,
    ngMessage,
    uiRouter,
    loader,
    toaster,

    CommonModule,
    ComponentsModule
  ])
  .component('app', AppComponent)
  
  .constant('API_URL', 'http://localhost:3000/api')
  // where to log client errors & exceptions
  .constant('REMOTE_LOGGING_URL', 'http://localhost:3000/api/client-logs')
  
  .config(($locationProvider, $httpProvider)=> {
    'ngInject';
    
    // Configure common http headers
    // angular does not add it by default; needed by server to identify ajax requests.
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';  
    
    // enable cross domain calls from client. The server also needs to be 
    // configured to handle cross domain calls.
    $httpProvider.defaults.useXDomain = true;  
    $httpProvider.defaults.withCredentials = true; 

    // add interceptors
    $httpProvider.interceptors.push(InjectApiUrlInterceptor);

    // remove hasbangs(!#) from urls. 
    $locationProvider.html5Mode(true);

  })
  
  .run(($transitions, cfpLoadingBar, authService, $rootScope) => {
    'ngInject';

    // show a loader when a state transitions
    $transitions.onStart({}, cfpLoadingBar.start);
    $transitions.onSuccess({}, cfpLoadingBar.complete);

    // on app bootstrap. i.e. whenever it loads or reloads, update the current 
    // user(from server) & emit an event with the user data, so that any part 
    // of app can listen & update the current user changes.
    authService.updateUser()
      .then(() => {
        const user = authService.getUser();
        console.log('user(run block): ', user);
        $rootScope.$emit('user:update');
      });

  })
  .name;
