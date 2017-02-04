import templateUrl from './header.html';

export const headerComponent = {
  
  bindings: {
    user: '<',
    onLogout: '&'
  },
  
  templateUrl,

  controller: class HeaderComponent {
    
    constructor() {
      'ngInject';
    }

    $onChanges(changes) {
      // console.log('header user(onChanges): ', this.user);
      if(changes.user) {
        this.user = angular.copy(this.user);
      }     
    }
  
  }

};