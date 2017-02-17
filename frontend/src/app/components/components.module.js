// import modules
import { loggerModule } from './logger/logger.module';
import { authModule } from './auth/auth.module';
import { FormErrorMessageModule } from './form-error-message/form-error-message.module';
import { ShowRatingModule } from './rating/rating.module';
import { PopupBoxModule } from './popup-box/popup-box.module';

// import directives
import { UserAvatar } from './user-avatar/user-avatar.directive';

export const ComponentsModule = angular
  .module('components', [
    loggerModule,
    authModule,
    FormErrorMessageModule,
    ShowRatingModule,
    PopupBoxModule,
  ])
  .directive('userAvatar', () => new UserAvatar())
  .name;