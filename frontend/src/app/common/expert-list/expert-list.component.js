import templateUrl from './expert-list.html';

export const ExpertListComponent = {
  templateUrl,

  bindings: {
    list: '<'
  },

  controller: class ExpertListComponent {
    constructor() {
      'ngInject';

    }
  }

};