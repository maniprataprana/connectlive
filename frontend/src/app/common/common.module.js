import { headerModule } from './header/header.module'
import { canvasModule } from './canvas/canvas.module'

export const commonModule = angular
  .module('common', [
    headerModule,
    canvasModule
  ])
  .config(($stateProvider) => {
    'ngInject';
    
    $stateProvider
      .state('home', {
        url: '/',
        redirectTo: 'canvas'
      });
  }) 
  .name;