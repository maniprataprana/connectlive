import { headerComponent } from './header.component';
import './header.scss';

export const headerModule = angular
  .module('common.header', [])
  .component('appHeader', headerComponent)
  .name;
