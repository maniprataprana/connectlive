import { FormErrorMessageComponent } from './form-error-message.component';

export const FormErrorMessageModule = angular
  .module('components.form-error-message', [])
  .component('formErrorMessage', FormErrorMessageComponent)
  .name;
