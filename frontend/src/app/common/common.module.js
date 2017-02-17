import { HeaderModule } from './header/header.module'
import { FooterModule } from './footer/footer.module'
import { CanvasModule } from './canvas/canvas.module'
import { SearchModule } from './search/search.module';
import { ExpertListModule } from './expert-list/expert-list.module';

import { HomepageModule } from './homepage/homepage.module';
import { ExpertPageModule } from './expertpage/expertpage.module';

import {ExpertService} from './expert.service';

export const CommonModule = angular
  .module('common', [
    HeaderModule,
    FooterModule,
    CanvasModule,
    SearchModule,
    ExpertListModule,
    HomepageModule,
    ExpertPageModule,

  ])
  .service('expertService', ExpertService)
  .config(($stateProvider) => {
    'ngInject';
    

    $stateProvider
      .state('app', {
        redirectTo: '/'
      });

  }) 
  .name;