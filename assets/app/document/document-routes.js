(function(ng) {

    'use strict';

    ng.module('SimplePCMS')
      .config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.when('/documents', '/documents/list');

      $stateProvider
        .state('documents', {
          abstract: true,
          url: '/documents',
          controller: 'DocumentCtrl',
          template: '<div ui-view></div>',
          resolve: {
            DocumentDefinition : function getDocumentDefinition (SailsResourceDefinitions) {
              return SailsResourceDefinitions.get('documents');
            },
            Documents: function documentsListResolve(Restangular) {
              return Restangular.all('documents').getList();
            }
          },
        })
        .state('documents.list', {
            url: '/list',
            templateUrl: 'app/document/document-list.html'
        })
        .state('documents.add', {
            url: '/add',
            templateUrl: 'app/document/document-add-edit.html'
        })
        .state('documents.edit', {
            url: '/edit/:id',
            controller: 'SingleDocumentCtrl',
            templateUrl: 'app/document/document-add-edit.html'
        })
        .state('documents.solutions', {
            url:'/solutions',
            templateUrl: 'app/document/document-solution-list.html'
        })
        .state('documents.qualify', {
            url: '/qualify/:id',
            controller: 'SingleDocumentCtrl',
            templateUrl: 'app/document/document-qualify.html'
        })
        .state('documents.score', {
            url: '/score/',
            templateUrl: 'app/document/score-list.html'
        })
        .state('documents.view', {
            url: '/view/:id',
            controller: 'SingleDocumentCtrl',
            templateUrl: 'app/document/document-view-render.tpl.html'
        })
        .state('documents.solve', {
            url: '/solve/:id',
            controller: 'SingleProblemCtrl',
            templateUrl: 'app/document/document-view-solve.tpl.html',
        });
      });
})(
    window.angular
);
