import { FooterComponent } from './footer.component';

import './footer.scss';

export const FooterModule = angular
  .module('common.footer', [])
  .component('appFooter', FooterComponent)
  .name;