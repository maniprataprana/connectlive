import templateUrl from './register.html';

export const registerComponent = {
  templateUrl,
  controller: class RegisterComponent {
    constructor(AuthService, $state) {
      'ngInject';

      this.authService = AuthService;
      this.$state = $state;
    }
    $onInit() {
      this.user = {
        email: '',
        password: '',
      };
    }
    createUser(event) {
      return this.authService.register(event.user);
    }
  },
};
