(function(ng, _) {
  'use strict';

  ng.module('SimplePCMS', [
                            'restangular',
                            'ui.router',
                            'ui.bootstrap',
                            'ngAnimate',
                            'btford.markdown',
                            'ngFileReader',
                            'toggle-switch'
                          ]
           )
    .config(function(RestangularProvider, $stateProvider, $urlRouterProvider) {
      RestangularProvider
        .addRequestInterceptor(function(el, operation) {
          if (operation === 'put' || operation === 'post') {
            // We don't need to send these to the API
            _.each(['createdAt', 'updatedAt', 'definition'], function(prop) {
              if (el[prop]) {
                delete el[prop];
              }
            });
          }
          return el;
        })
        .setResponseExtractor(function(response) {
            var newResponse = response;
            if (_.isArray(response)) {
              _.each(newResponse, function(value, idx) {
                newResponse[idx].originalElement = _.clone(value, true);
              });
            } else {
              newResponse.originalElement = _.clone(response, true);
            }
            return newResponse;
          });
      
            $urlRouterProvider
                .when('/home', '/');

            $stateProvider
                .state('home', {
                    //abstract: true,
                    url: '/',
                    //controller: 'UserCtrl',
                    templateUrl: 'app/partials/home.tpl.html'
                });
            $urlRouterProvider.otherwise("/home");
      
        });

})(
    window.angular,
    window._
);