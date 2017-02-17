import { PopupBoxComponent } from './popup-box.component';

import './popup-box.scss';

export const PopupBoxModule = angular
  .module('components.popup-box', [])
  .component('popupBox', PopupBoxComponent)
  .name;