/**
 * Customize the behavior of default exception handling. By default angular 
 * calls $exceptionHandler which just logs the error to the console with 
 * $log.error. However, we want to achieve these objectives:
 * 1. let angular do its way of exception handling,
 * 2. generate a meaningful stack trace using stacktrace.js library,
 * 3. gather other useful client information, and
 * 4. send the collected data to server to aid better debugging.
 */
export function RemoteLoggingExceptionHandler($delegate, $log, remoteLogger) {
  'ngInject';

  // console.log('..intercepting exception');
  // exception: exception associated with the error
  // cause: optional info. about the context in which the error was thrown
  return function(exception, cause) {

    // $delegate references & provides the original $exceptionHandler service, 
    // that we invoke, which just logs the exception to console with $log.error.
    $delegate(exception, cause);

    // Generate a stack trace for the exception.
    remoteLogger
      .getStackTrace(exception)
      .then((stacktrace) => {

        // Append the stack trace with other useful client information.
        const dataToSend = { 
          exception: exception.message, 
          cause: cause || '',
          stacktrace: stacktrace
        };
        // console.log('dataToSend: ', dataToSend);
        
        // Send all collected exception data to server.
        // The angular $http service cannot be used in the decorator because 
        // it will cause a circular dependecy. Since we need a non-angular way 
        // to send the data, we send it by using the native browser 
        // XMLHttpRequest object. 
        remoteLogger
          .sendExceptionData(dataToSend)
          .then(angular.noop) // do nothing
          .catch((error) => {
            $log.debug(`Error Sending Stack Trace to Server: \n ${error}`);
          });
    
    })
    .catch((error) => $log.error);// error generating a stack trace
  }

}