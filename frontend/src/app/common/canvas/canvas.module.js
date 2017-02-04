import { canvasComponent } from './canvas.component';
import './canvas.scss';

export const canvasModule = angular
  .module('common.canvas', [])
  .component('appCanvas', canvasComponent)
  .config(($stateProvider) => {
    'ngInject';
    
    $stateProvider
      .state('canvas', {
        component: 'appCanvas'
      });
  })  
  .name;
