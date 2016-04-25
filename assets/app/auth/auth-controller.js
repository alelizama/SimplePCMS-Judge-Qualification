(function(ng, _) {

  'use strict';

  ng.module('SimplePCMS')
      .controller('AuthCtrl', AuthCtrl)

  function AuthCtrl($scope, $state, $http, $window, $translate)
  {
    $scope.name = {t: 'hello!'};
    $scope.pass = {};
    $scope.message = {type: 'danger', msg:''}

    $scope.changeLanguage = function(key)
    {
      $translate.use(key);
    };

    $scope.login = function (pass)
    {
      $http
        .post('/login', pass)
        .success(function (data, status, headers, config) {
          $window.sessionStorage.token = data.token;
          $state.go('documents.list');
        })
        .error(function (data, status, headers, config) {
          delete $window.sessionStorage.token;
          $scope.message.type = 'danger';
          $scope.message.msg = 'Incorrect username or password';
        });
    };

    $scope.getUserType = function()
    {
        var base64Url = $window.sessionStorage.token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var tmpUser = JSON.parse($window.atob(base64));
        var rol = tmpUser.rol;
        console.log(tmpUser.rol);
        return rol;
    };

  }


})(
    window.angular,
    window._
);
