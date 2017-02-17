import { HomepageComponent } from './homepage.component';
import './homepage.scss';

export const HomepageModule = angular
  .module('common.homepage', [])
  .component('appHomepage', HomepageComponent)
  .config(($stateProvider) => {
    'ngInject';
    
    $stateProvider
      .state('canvas.homepage', {
        url: '/',
        component: 'appHomepage'
      });
  })  
  .name;
