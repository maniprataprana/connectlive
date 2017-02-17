import { ShowRatingComponent } from './rating.component';

import './rating.scss';

export const ShowRatingModule = angular
  .module('components.rating', [])
  .component('showRating', ShowRatingComponent) 
  .name;
