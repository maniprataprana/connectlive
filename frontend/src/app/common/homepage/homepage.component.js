import templateUrl from './homepage.html';

export const HomepageComponent = {
  templateUrl,

  controller: class HomepageComponent {
    constructor(expertService) {
      'ngInject';

      this.expertService = expertService;
      this.expertList = [];        
    
    }
    $onInit() {
      this.loadExperts();
    }

    loadExperts() {
      this.expertService.getExpertList()
        .then((response) => { 
          this.expertList = response;  
      });
    }

  }

};