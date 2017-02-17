import templateUrl from './form-error-message.html'

export const FormErrorMessageComponent  = {

  templateUrl,

  bindings: {
    form: '<',
    field: '@',
    fieldError: '<'

  },

  // controller: class FormErrorMessageComponent {
  //   constructor() {
  //     'ngInject';
  //     console.log('this:', this);
  //   }

  // $onChanges() {
  //     console.log('field:', this.form[this.field]);    
  // }


  // }  

};