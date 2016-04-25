(function(ng, _) {

  'use strict';

  ng.module('SimplePCMS')
      .controller('HomeCtrl', HomeCtrl)

  function HomeCtrl($scope, $state, $http, $window, $translate)
  {
        $scope.getUserType = function()
        {
          //if($window.sessionStorage.token !== undefined)
          //{
            //var base64Url = $window.sessionStorage.token.split('.')[1];
            //var base64 = base64Url.replace('-', '+').replace('_', '/');
            //var tmpUser = JSON.parse($window.atob(base64));
            //var rol = tmpUser.rol;
            //return rol;
          //}
          //else {
            return "none";
          //}
        };

        $scope.changeLanguage = function(key)
        {
          $translate.use(key);
        };
  }


})(
    window.angular,
    window._
);
