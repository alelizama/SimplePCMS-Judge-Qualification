(function(ng, _) {

  'use strict';

  ng.module('SimplePCMS')
      .controller('AuthCtrl', AuthCtrl)

  function AuthCtrl($scope, $state, $http, $window) {
    $scope.name = {t: 'hello!'};

    $scope.pass = {};

    $scope.message = {type: 'danger', msg:''}

    $scope.login = function (pass)
    {
      $http
        .post('/login', pass)
        .success(function (data, status, headers, config) {
          $window.sessionStorage.token = data.token;
          $state.go('home');
        })
        .error(function (data, status, headers, config) {
          delete $window.sessionStorage.token;
          $scope.message.type = 'danger';
          $scope.message.msg = 'Incorrect username or password';
          console.log($scope.message.msg);
        });
    };

  }


})(
    window.angular,
    window._
);
