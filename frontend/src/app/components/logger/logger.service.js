
import StackTrace from 'stacktrace-js';

export class RemoteLogger {

  /**
   * Injecting dependencies and binding to instance variables for later use.
   */
  constructor(REMOTE_LOGGING_URL, $window) {
    'ngInject';
    this.REMOTE_LOGGING_URL = REMOTE_LOGGING_URL;
    this.$window = $window;
  }

  /**
   * Gets the stack trace from the browser using stacktrace library. 
   * It returns a normalised exception data for all browsers. 
   */
  getStackTrace(error) {
    return StackTrace.fromError(error);
  }

  /**
   * Sends data to server and returns a promise. Using the native browser api's 
   * to send data to server.
   */
  sendData(type, data) {
    const url = this.REMOTE_LOGGING_URL;
    // build the final data to be sent
    const payload = {};
    payload.type = type;
    payload.location = this.$window.location.href;
    payload.details = data;
    
    // Create a native ES6 promise and return it.
    return new Promise(function(resolve, reject) {
      // Create the XMLHttpRequest object:
      var req;
      if (window.XMLHttpRequest) 
        req = new XMLHttpRequest();
      else if (window.ActiveXObject) 
        req = new ActiveXObject("Microsoft.XMLHTTP");      
      
      req.onerror = reject;
      req.onreadystatechange = function onreadystatechange() {
        if(req.readyState === 4) {
          if(req.status === 200 && req.status < 400) {
            resolve(req.responseText);
          } else {
            reject(new Error(`POST request to ${url} failed with status: ${req.status}`));        
          }
        }
      };

      // Fire off the request
      req.open('post', url, true);  
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(payload));
  
    });
  }

  /**
   * Sends the gathered stack trace from any exception error to server  
   */
  sendExceptionData(data) {
    return this.sendData('exception', data);
  }

  /**
   * Meant to send any errors that does not throw an exception. For e.g.: 
   * when a promise gets rejected due to bad response from server, it does not
   * throw an exception but might need a developer attention.  
   */
  sendErrorData(data) {
    return this.sendData('error', data);
  }

  /**
   * Can be used to send some kind of debug data to server for analysis.
   */
  sendDebugData(data) {
    return this.sendData('debug', data);
  }


}

