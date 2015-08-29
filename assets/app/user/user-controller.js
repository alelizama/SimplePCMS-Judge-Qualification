(function(ng, _) {

    'use strict';

    ng.module('SimplePCMS')
        .controller('UserCtrl', UserCtrl)
        .controller('SingleUserCtrl', SingleUserCtrl);

    function UserCtrl($scope, $state, Users, UserDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('users');

        $scope.users = Users;
        $scope.model_def = UserDefinition.originalElement;
        $scope.user = {};

        $scope.remove = function remove(user) {
            user = user || $scope.user;
            if (window.confirm('Are you sure you want to delete this user?')) {
                return resourceService.remove(user, $scope.users);
            }
        };

        $scope.save = function save(user) {
            user = user || $scope.user;
            return resourceService.save(user, $scope.users)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
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
