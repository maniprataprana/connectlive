import { SearchComponent } from './search.component';
import { SearchFocus } from './search-focus.directive';

import './search.scss';

export const SearchModule = angular
  .module('common.search', [])
  .component('appSearch', SearchComponent)
  .directive('appSearchFocus', () => new SearchFocus())
  .config(($stateProvider) => {
    'ngInject';
    
    $stateProvider
      .state('canvas.search', {
        url: '/search',
        component: 'appSearch'
      });
  })  
  .name;
