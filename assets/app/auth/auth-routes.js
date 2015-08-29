(function(ng) {
    
    'use strict';

    ng.module('SimplePCMS')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/auth', '/auth/login');
      
            $stateProvider
                .state('auth', {
                    abstract: true,
                    url: '/auth',
                    controller: 'AuthCtrl',
                    template: '<div ui-view></div>',
                })
                .state('auth.login', {
                    url: '/login',
                    templateUrl: 'app/auth/auth-login.tpl.html'
                })
                .state('auths.logout', {
                    url: '/logout'
                });
        });
})(
    window.angular
);
