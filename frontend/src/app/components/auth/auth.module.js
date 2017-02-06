import { AuthService } from './auth.service';

import { loginModule } from './login/login.module';
import { registerModule } from './register/register.module';
import { authFormModule } from './auth-form/auth-form.module';

import { authComponent } from './auth.component';

import './auth.scss';


export const authModule = angular
  .module('components.auth', [
		// uiRouter,
    loginModule,
    registerModule,
    authFormModule,
  ])
  .component('auth', authComponent)
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('auth', {
        url: '/auth',
        redirectTo: 'auth.login',
        component: 'auth',
      });
  })
  .run(($transitions, $state, authService) => {
    'ngInject';

    // $transitions.onStart({
    //   to: (state) => !!(state.data && state.data.requiredAuth),
    // }, () => {
    //   return AuthService
    //     .requireAuthentication()
    //     .catch(() => $state.target('auth.login'));
    // });
    // $transitions.onStart({
    //   to: 'auth.*',
    // }, () => {
    //   if (AuthService.isAuthenticated()) return $state.target('dashboard');
    // });
 
 })
  .service('authService', AuthService)
  .name;