import templateUrl from './register.html';

export const registerComponent = {
  templateUrl,
  controller: class RegisterComponent {
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
    createUser(event) {
      return this.authService.register(event.user);
    }
  },
};
