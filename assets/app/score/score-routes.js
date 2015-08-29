(function(ng) {
    
    'use strict';

    ng.module('SimplePCMS')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/scores', '/scores/list');

            $stateProvider
                .state('scores', {
                    abstract: true,
                    url: '/scores',
                    controller: 'ScoreCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        ScoreDefinition : function getScoreDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('scores');
                        },
                        Scores: function scoresListResolve(Restangular) {
                            return Restangular.all('scores').getList();
                        }
                    },
                })
                .state('scores.list', {
                    url: '/list',
                    templateUrl: 'app/score/score-list.html'
                })
/*
                .state('scores.info', {
                    url: '/info/:id',
                    controller: 'SingleScoreCtrl',
                    templateUrl: 'app/score/score-info.html'
                })
                .state('scores.edit', {
                    url: '/edit/:id',
                    controller: 'SingleScoreCtrl',
                    templateUrl: 'app/score/score-add-edit.html'
                })
*/ 
                ;
        });
})(
    window.angular
);
