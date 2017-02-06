import { loggerModule } from './logger/logger.module';
import { authModule } from './auth/auth.module'

export const componentsModule = angular
  .module('components', [
    loggerModule,
    authModule
  ])
  .name;