
export class SearchFocus {

  constructor() {
    'ngInject';

    this.restrict = 'A';
  }

  link($scope, $element, $attrs) {  
    $element[0].focus();
  }

};