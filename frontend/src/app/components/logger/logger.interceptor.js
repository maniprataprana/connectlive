/**
 * Intercept all incoming error responses and for certain error codes that might
 * aid in debugging, log these errors to a remote server.
 */
export function InterceptErrorResponseAndLogRemotely($q, remoteLogger) {
  'ngInject';
  return {
    responseError: function (response) {
      if (response.status === 500 ) {
        remoteLogger.sendErrorData({
          calledApi: response.config.url,
          calledMethod: response.config.method,
          errorCode: response.status,
          errorData: response.data
        });
      }
      return $q.reject(response);
    }
  } 

}