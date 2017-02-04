import { formComponent } from './auth-form.component';

export const authFormModule = angular
  .module('components.auth.auth-form', [])
  .component('authForm', formComponent)
  .name;
