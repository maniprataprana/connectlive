import { HeaderComponent } from './header.component';
import './header.scss';

export const HeaderModule = angular
  .module('common.header', [])
  .component('appHeader', HeaderComponent)
  .name;
