import templateUrl from './search.html';

export const SearchComponent = {
  templateUrl,

  controller: class SearchComponent {
    constructor(expertService) {
      'ngInject';

      this.expertService = expertService;
        
    }

    search() {
      this.expertList = [];
      console.log(this.searchText);
      this.expertService.getExpertList()
        .then((response) => { 
          // console.log(response);
          this.expertList = response;  
      });
    }

  }

};