import templateUrl from './auth-form.html';

export const formComponent = {
  bindings: {
    user: '<',
    button: '@',
    onSubmit: '&',
  },
  templateUrl,
  controller: class FormComponent {
    constructor($window, authService) {
      'ngInject';
      this.authService = authService;
      this.$window = $window;
    }
    $onChanges(changes) {
      if (changes.user) {
        this.user = angular.copy(this.user);
      }
    }
    submitForm() {
      this.onSubmit({
        $event: {
          user: this.user,
        },
      });
    }

    goAndAuthenticate(type) {
  	  const socialUrl = this.authService.getSocialAuthURL(type);
  	  console.log('socialUrl: ', socialUrl);
  	  this.$window.location.href = socialUrl;
    }

  },
};
