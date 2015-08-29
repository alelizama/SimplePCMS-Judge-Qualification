(function(ng) {
    
    'use strict';

    ng.module('SimplePCMS')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/menus', '/menus/list');

            $stateProvider
                .state('menus', {
                    abstract: true,
                    url: '/menus',
                    controller: 'MenuCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        MenuDefinition : function getMenuDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('menus');
                        },
                        Menus: function menusListResolve(Restangular) {
                            return Restangular.all('menus').getList();
                        }
                    },
                })
                .state('menus.list', {
                    url: '/list',
                    templateUrl: 'app/menu/menu-list.html'
                })
                .state('menus.add', {
                    url: '/add',
                    templateUrl: 'app/menu/menu-add-edit.html'
                })
                .state('menus.info', {
                    url: '/info/:id',
                    controller: 'SingleMenuCtrl',
                    templateUrl: 'app/menu/menu-info.html'
                })
                .state('menus.edit', {
                    url: '/edit/:id',
                    controller: 'SingleMenuCtrl',
                    templateUrl: 'app/menu/menu-add-edit.html'
                });
        });
})(
    window.angular
);
