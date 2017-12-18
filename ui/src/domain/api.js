const m = require('mithril');

const apiFactory = function (apiBase) {

  // wrap up request in a bluebird promise with some default
  // options to create the base api function
  var apibase = apiBase ? apiBase : window.location.origin;

  var api = function (method, url, options = {}) {
    // instantiate options as an empty object literal
    var header = url.indexOf('http') === 0 ? {} : {
      'Content-Type': 'application/json'
    };

    let uri = url.indexOf('http') === 0 ? url : apibase + url;
    Object.assign(
      options, {
        url: options.params ? `${uri}?${m.buildQueryString(options.params)}` : uri,
        // set the http request method
        method: method,
        withCredentials: options.credentials ? options.credentials : true,
        // if the url starts with 'http', leave it be, otherwise
        // prefix api_base to the url
        // if the url starts with http, leave headers be
        headers: options.headers ? options.headers : header
      }
    );
    return m.request(options);
  }
  // attach shorthands for get, put, post, delete to api
  let methods = ['GET', 'PUT', 'POST', 'DELETE'];
  methods.forEach(function (m) {
    api[m.toLowerCase()] = function (url, options) {
      return api(m, url, options);
    };
  });
  return api;
}

export {
  apiFactory
}
