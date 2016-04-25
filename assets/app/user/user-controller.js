(function(ng, _) {

  'use strict';

  ng.module('SimplePCMS')
    .controller('UserCtrl', UserCtrl)
    .controller('SingleUserCtrl', SingleUserCtrl);

  function UserCtrl($scope, $state, $window, Documents, Users, UserDefinition, SailsResourceService, $translate) {
    var resourceService = new SailsResourceService('users');

    $scope.documents = Documents;
    $scope.users = Users;
    $scope.model_def = UserDefinition.originalElement;
    $scope.user = {};

    $scope.changeLanguage = function(key) {
      $translate.use(key);
    };

    $scope.remove = function remove(user) {
      user = user || $scope.user;
      if (window.confirm('Are you sure you want to delete this user?')) {
        return resourceService.remove(user, $scope.users);
      }
    };

    $scope.getUserType = function() {
      if ($window.sessionStorage.token == undefined) {
        $state.go('home');
      } else {
        var base64Url = $window.sessionStorage.token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var user = JSON.parse($window.atob(base64));
        var rol = user.rol;
        if (rol != 'admin') {
          $state.go('home');
        }
        return rol;
      }
    }

    $scope.getUserCount = function(rol) {
      var count = 0;
      for (var i = 0; i < $scope.users.length; i++) {
        var tempUser = $scope.users[i];
        if (tempUser.rol === rol) {
          count = count + 1;
        }
      }
      return count;
    }

    $scope.save = function save(user) {
      user = user || $scope.user;
      return resourceService.save(user, $scope.users)
        .then(function() {
          $state.go('^.list');
        }, function(err) {
          console.error('An error occured: ' + err);
        });
    };

    $scope.getSolutions = function getSolutions(title, status, porcentage) {
      var count = 0;

      for (var i = 0; i < $scope.documents.length; i++) {
        var tempDocuments = $scope.documents[i];
        if (status === 'all') {
          if (tempDocuments.title === title && tempDocuments.status !== 'publish') {
            count++;
          }
        }
        else
        {
          if (tempDocuments.title === title && tempDocuments.status === status) {
            count++;
          }
        }
      }
      if(porcentage === 'true')
      {
        var countUser = 0;
        for (var i = 0; i < $scope.users.length; i++) {
          var tempUser = $scope.users[i];
          if (tempUser.rol === 'participant') {
            countUser++;
          }
        }
        count = (count / countUser) * 100;
      }
      return count;
    };

    $scope.getTotalProblems = function() {
      var count = 0;
      for (var i = 0; i < $scope.documents.length; i++) {
        var tempDocuments = $scope.documents[i];
        if (tempDocuments.type === 'problem') {
          count++;
        }
      }
      return count;
    };
  }

  function SingleUserCtrl($scope, $stateParams, Users, UserDefinition) {
    $scope.user = _.find(Users, {
      id: $stateParams.id
    });
  }

})(
  window.angular,
  window._
);
