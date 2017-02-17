import { ExpertListComponent } from './expert-list.component';

import './expert-list.scss';

export const ExpertListModule = angular
  .module('common.expert-list', [])
  .component('expertList', ExpertListComponent) 
  .name;
