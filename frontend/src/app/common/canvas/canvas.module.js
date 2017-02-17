import { CanvasComponent } from './canvas.component';
import './canvas.scss';

export const CanvasModule = angular
  .module('common.canvas', [])
  .component('appCanvas', CanvasComponent)
  .config(($stateProvider) => {
    'ngInject';
    
    $stateProvider
      .state('canvas', {
        component: 'appCanvas'
      });
  })  
  .name;
