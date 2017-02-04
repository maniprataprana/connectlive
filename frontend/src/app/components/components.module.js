import { authModule } from './auth/auth.module'

export const componentsModule = angular
  .module('components', [
    authModule
  ])
  .name;