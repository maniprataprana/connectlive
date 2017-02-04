/**
 * Intercept each server request and prepend the api url to them. 
 * Precautions (to be taken):
 * 1. Don't process template requests initiated by angular. 
 *   i.e: request for any .html file. 
 * 2. Process only relative urls.  
 * 
 */

// to make api requests to the server;
// prepend requests with the required server namespace.  


export const InjectApiUrlInterceptor = function($q, API_URL) {
  'ngInject';
  return {
    request: function(config) {
      var url = config.url;
      var urlStartsWithApi = /^\/api/.test(url);
      var urlStartsWithHttp = /^\/http/.test(url);
      var urlEndsWithHtml = /.html$/.test(url);

      if (!urlStartsWithHttp && !urlStartsWithApi && !urlEndsWithHtml) {
        config.url = API_URL + config.url;
      }
      return config;
    }
  }

};
