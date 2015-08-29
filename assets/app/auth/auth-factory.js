/**
 * Heads Up! I'm using this code from https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/
 * Yes, I'm still a js newbie... but, you need to start from something
 */

(function(ng) {
  'use strict';
  
  ng.module('SimplePCMS').factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = $window.sessionStorage.token;
        }
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
          //$state.go('auth.login');
        } else if (response.status === 403) {
          //$state.go('home');
        }
        return response || $q.when(response);
      }
    };
  });
  
  ng.module('SimplePCMS').config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

})(window.angular);