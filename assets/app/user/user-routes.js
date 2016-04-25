(function(ng) {

    'use strict';

    ng.module('SimplePCMS')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/users', '/users/list');

            $stateProvider
                .state('users', {
                    abstract: true,
                    url: '/users',
                    controller: 'UserCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        UserDefinition : function getUserDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('users');
                        },
                        Users: function usersListResolve(Restangular) {
                            return Restangular.all('users').getList();
                        },
                        DocumentDefinition : function getDocumentDefinition (SailsResourceDefinitions) {
                          return SailsResourceDefinitions.get('documents');
                        },
                        Documents: function documentsListResolve(Restangular) {
                          return Restangular.all('documents').getList();
                        }
                    },
                })
                .state('users.home', {
                    url: '/home',
                    templateUrl: 'app/user/home.tpl.html.html'
                })
                .state('users.list', {
                    url: '/list',
                    templateUrl: 'app/user/user-list.html'
                })
                .state('users.add', {
                    url: '/add',
                    templateUrl: 'app/user/user-add-edit.html'
                })
                .state('users.info', {
                    url: '/info/:id',
                    controller: 'SingleUserCtrl',
                    templateUrl: 'app/user/user-info.html'
                })
                .state('users.resume', {
                    url: '/resume/',
                    templateUrl: 'app/user/user-resume.html'
                })
                .state('users.edit', {
                    url: '/edit/:id',
                    controller: 'SingleUserCtrl',
                    templateUrl: 'app/user/user-add-edit.html'
                });
        });
})(
    window.angular
);
