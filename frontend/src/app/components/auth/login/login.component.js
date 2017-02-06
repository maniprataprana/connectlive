import templateUrl from './login.html';

export const loginComponent = {
  templateUrl,
  controller: class LoginComponent {
    constructor(authService, $state) {
      'ngInject';

      this.authService = authService;
      this.$state = $state;
    }
    $onInit() {
      this.user = {
        email: '',
        password: '',
      };
    }
    loginUser(event) {
      return this.authService.login(event.user);
    }
  },
};
