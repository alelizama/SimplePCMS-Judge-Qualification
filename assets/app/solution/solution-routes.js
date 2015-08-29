(function(ng) {

    'use strict';

    ng.module('SimplePCMS')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/solutions', '/solutions/list');

            $stateProvider
                .state('solutions', {
                    abstract: true,
                    url: '/solutions',
                    controller: 'SolutionCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        SolutionDefinition : function getSolutionDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('solutions');
                        },
                        Solutions: function solutionsListResolve(Restangular) {
                            return Restangular.all('solutions').getList();
                        }
                    },
                })

                .state('solutions.list', {
                    url: '/list',
                    templateUrl: 'app/solution/solution-list.html'
                })
                .state('solutions.view', {
                    url: '/edit/:id',
                    controller: 'SingleSolutionCtrl',
                    templateUrl: 'app/solution/solution-add-edit.html'
                })

                ;
        });
})(
    window.angular
);
