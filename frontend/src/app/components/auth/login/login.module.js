import uiRouter from 'angular-ui-router';
import { loginComponent } from './login.component';

export const loginModule = angular
  .module('components.auth.login', [
    uiRouter,
  ])
  .component('login', loginComponent)
  .config(($stateProvider) => {
    'ngInject';
    
    $stateProvider
      .state('auth.login', {
        url: '/login',
        component: 'login',
      });  

  })
  .name;
