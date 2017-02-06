import { RemoteLoggingExceptionHandler } from './logger.decorator';
import { RemoteLogger } from './logger.service';
import {  InterceptErrorResponseAndLogRemotely } from './logger.interceptor';

export const loggerModule = angular
  .module('components.logger', [
  ])
  .service('remoteLogger', RemoteLogger) 
  .config(($httpProvider, $provide) => {
    'ngInject';

    // add interceptors
    $httpProvider.interceptors.push(InterceptErrorResponseAndLogRemotely);

    // $provide provider is used to register components in angular internally.
    // use decorator to customise the behavior of a service
    $provide.decorator('$exceptionHandler', RemoteLoggingExceptionHandler);
    
  })
  .name;
