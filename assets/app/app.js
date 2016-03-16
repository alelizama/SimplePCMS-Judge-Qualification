(function(ng, _) {
  'use strict';

  ng.module('SimplePCMS', [
                            'restangular',
                            'ui.router',
                            'ui.bootstrap',
                            'ngAnimate',
                            'btford.markdown',
                            'ngFileReader',
                            'toggle-switch',
                            'pascalprecht.translate'
                          ]
           )

    .config(function(RestangularProvider, $stateProvider, $urlRouterProvider, $translateProvider)
    {
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
                    controller: 'HomeCtrl',
                    templateUrl: 'app/partials/home.tpl.html'
                });
            $urlRouterProvider.otherwise("/home");

            $translateProvider.translations('en',
            {
              ADDNEW: 'Add new document',
              ADDNEWUSER: 'Add new user',
              ANYDOCUMENT: 'Looks like you have not added any documents yet',
              ANYUSER: 'Looks like you have not added any users yet',
              BUTTON_EN: 'English',
              BUTTON_ES: 'Spanish',
              CANCEL: 'Cancel',
              CODE: 'Code',
              CONTENTS: 'Content',
              DATE: 'Date',
              DELETE: 'Delete',
              DOCUMENTS: 'Documents',
              EDIT: 'Edit',
              GROUP: 'Group',
              INCORRECT: 'Incorrect username or password',
              INPUT: 'Input',
              JUDGES: 'Judges',
              LEADERBOARD: 'Leaderboard',
              LISTDOCUMENTS: 'Listing all the documents (Pages or problems)',
              LISTJUDGES: 'Listing all the judges',
              LISTPARTICIPANTS: 'Listing all the participants',
              LISTSOLUTIONS: 'Listing all the solutions',
              LOGIN: 'Login',
              NONE: 'None',
              SAVE: 'Save',
              SCORE: 'Score',
              SCORES: 'Scores',
              SOLUTION: 'Solution',
              SOLUTIONS: 'Solutions',
              OUTPUT: 'Output',
              PAGE: 'Page',
              PARTICIPANTS: 'Participants',
              PASSWORD: 'Password',
              PROBLEM: 'Problem',
              QUALIFY: 'Qualify',
              RESUME: 'Resume',
              TITLE: 'Title',
              TYPE: 'Type',
              USERS: 'Users',
              USERNAME: 'Username',
              VIEW: 'View',
              WELCOME: 'Welcome',
            });

            $translateProvider.translations('es',
            {

              ADDNEW: 'Agregar nuevos documentos',
              ADDNEWUSER: 'Agregar nuevos usuarios',
              ANYDOCUMENT: 'Parece que aún no has agregado ningún documento',
              ANYUSER: 'Parece que aún no has agregado ningún documento',
              BUTTON_EN: 'Inglés',
              BUTTON_ES: 'Español',
              CANCEL: 'Cancelar',
              CODE: 'Código',
              CONTENTS: 'Contenido',
              DATE: 'Fecha',
              DOCUMENTS: 'Documentos',
              DELETE: 'Eliminar',
              EDIT: 'Editar',
              GROUP: 'Grupo',
              INCORRECT: 'Nombre de usuario o contraseña incorrecta',
              INPUT: 'Entrada',
              JUDGES: 'Jueces',
              LEADERBOARD: 'Clasificación',
              LOGIN: 'Iniciar Sesión',
              LISTDOCUMENTS: 'Listado de todos los documentos (Páginas o problemas)',
              LISTJUDGES: 'Listado de todos los jueces',
              LISTPARTICIPANTS: 'Listado de todos los participantes',
              LISTSOLUTIONS: 'Listado de todas las soluciones',
              NONE: 'Ninguna',
              SAVE: 'Guardar',
              SCORE: 'Puntaje',
              SCORES: 'Puntajes',
              SOLUTION: 'Solución',
              SOLUTIONS: 'Soluciones',
              OUTPUT: 'Salida',
              PAGE: 'Página',
              PARTICIPANTS: 'Participantes',
              PASSWORD: 'Contraseña',
              PROBLEM: 'Problema',
              QUALIFY: 'Calificar',
              RESUME: 'Resumen',
              TITLE: 'Títutlo',
              TYPE: 'Tipo',
              USERS: 'Usuarios',
              USERNAME: 'Nombre de usuario',
              VIEW: 'Ver',
              WELCOME: 'Bienvenido'
            });
            $translateProvider.preferredLanguage('es');
            $translateProvider.useSanitizeValueStrategy('escape');
        });

})(
    window.angular,
    window._
);
