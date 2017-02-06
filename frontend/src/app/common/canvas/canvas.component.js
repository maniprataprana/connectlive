import templateUrl from './canvas.html';

export const canvasComponent = {
  templateUrl,

  controller: class CanvasComponent {
    constructor(authService, $state, $rootScope, toaster) {
      'ngInject';

      this.authService = authService;
      this.$state = $state;
      this.toaster = toaster;
      this.user = null;

      $rootScope.$on('user:update', (event, user) => {
        // console.log('on user:update :', user);
        this.user = user;
        
      });
    }

    logout() {
      // this.toaster.pop('success', "title", "text");
      return this.authService
        .logout()
        .then(() => this.$state.go('canvas'));
    }

  }


};