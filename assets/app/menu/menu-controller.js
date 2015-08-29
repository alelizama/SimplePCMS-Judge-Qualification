(function(ng, _) {
  'use strict';

  ng.module('SimplePCMS')
    .controller('MenuCtrl', MenuCtrl)
    .controller('SingleMenuCtrl', SingleMenuCtrl);

  function MenuCtrl($scope, $state, Menus, MenuDefinition, SailsResourceService) {
    var resourceService = new SailsResourceService('menus'.toLowerCase());
        
    $scope.menus = Menus;
    $scope.model_def = MenuDefinition.originalElement;
    $scope.menu = {};

    $scope.remove = function remove(menu) {
      menu = menu || $scope.menu;
      if (window.confirm('Are you sure you want to delete this menu?')) {
        return resourceService.remove(menu, $scope.menus);
      }
    };

    $scope.save = function save(menu) {
      menu = menu || $scope.menu;
      return resourceService.save(menu, $scope.menus)
            .then(function() {
              $state.go('^.list');
            }, function(err) {
              console.error('An error occured: ' + err);
            });
    };
  }

  function MenuDisplayCtrl($scope, $state, Menus, MenuDefinition, SailsResourceService) {
  
  }
  
  function SingleMenuCtrl($scope, $stateParams, Menus, MenuDefinition) {
    $scope.menu = _.find(Menus, {
      id: $stateParams.id
    });
  }

})(
    window.angular,
    window._
);
