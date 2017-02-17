import { ExpertPageComponent } from './expertpage.component';

import './expertpage.scss';

export const ExpertPageModule = angular
  .module('common.expertpage', [])
  .component('appExpertpage', ExpertPageComponent)
  
  .config(($stateProvider) => {
    'ngInject';
  
    $stateProvider
      .state('canvas.expertpage', {
        url: '/expert/:id',
        component: 'appExpertpage'
      });
  })  
  .name;

