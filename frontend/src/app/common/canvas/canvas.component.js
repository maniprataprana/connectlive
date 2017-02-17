import templateUrl from './canvas.html';

export const CanvasComponent = {
  templateUrl,
  
  controller: class CanvasComponent {
    constructor(authService, $state, $rootScope, toaster) {
      'ngInject';

      this.authService = authService;
      this.$state = $state;
      this.toaster = toaster;
      this.user = authService.getUser();

      this.unRegisterUpdateFunction = $rootScope.$on('user:update', () => {
        this.user = this.authService.getUser();
        
      });
    }

    logout() {
      // this.toaster.pop('success', "title", "text");
      return this.authService
        .logout()
        .then(() => this.$state.go('canvas.homepage'));
    }

    $onDestroy() {
      // clean up event handlers
      this.unRegisterUpdateFunction();
      // console.log('destroying canvas..');
    }
  }


};