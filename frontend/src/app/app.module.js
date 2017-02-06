import angular from 'angular';

// import 3rd party modules
import uiRouter from 'angular-ui-router';
import loader from 'angular-loading-bar';
import toaster from 'angularjs-toaster';

// import app. modules
import { commonModule } from './common/common.module';
import { componentsModule } from './components/components.module';

// import components
import { appComponent } from './app.component';

// import interceptors
import { InjectApiUrlInterceptor } from './app.interceptors';

// import styles
import 'angular-loading-bar/build/loading-bar.css'; 
import 'angularjs-toaster/toaster.css'; 
import './app.scss';


export const appModule = angular
  .module('app', [

    uiRouter,
    loader,
    toaster,

    commonModule,
    componentsModule
  ])
  .component('app', appComponent)
  .constant('API_URL', 'http://localhost:3000/api')
  // where to log client errors & exceptions
  .constant('REMOTE_LOGGING_URL', 'http://localhost:3000/api/client-logs')
  .config(($locationProvider, $httpProvider) => {
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
  .run(($transitions, cfpLoadingBar, AuthService, $rootScope) => {
    'ngInject';

    // show a loader when a state transitions
    $transitions.onStart({}, cfpLoadingBar.start);
    $transitions.onSuccess({}, cfpLoadingBar.complete);

    // on app bootstrap. i.e. whenever it loads or reloads, update the current 
    // user(from server) & emit an event with the user data, so that any part 
    // of app can listen & update the current user changes.
    AuthService.updateUser()
      .then(() => {
        const user = AuthService.getUser();
        console.log('user(run block): ', user);
        $rootScope.$emit('user:update', user);
      });

  })
  .name;
