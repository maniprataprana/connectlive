import templateUrl from './header.html';

export const HeaderComponent = {
  
  bindings: {
    user: '<',
    onLogout: '&'
  },
  
  templateUrl,

  controller: class HeaderComponent {
    
    constructor($location) {
      'ngInject';
      this.currentUrl = $location.url();
      console.log(this.currentUrl);
    }

    $onChanges(changes) {
      // console.log('header user(onChanges): ', this.user);
      if(changes.user) {
        this.user = angular.copy(this.user);
      }     
    }
  

  }

};