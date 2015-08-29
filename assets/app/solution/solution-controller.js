(function(ng, _) {

    'use strict';

    ng.module('SimplePCMS')
        .controller('SolutionCtrl', SolutionCtrl)
        .controller('SingleSolutionCtrl', SingleSolutionCtrl);

    function SolutionCtrl($scope, $state, Solutions, SolutionDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('solutions'.toLowerCase());

        $scope.solutions = Solutions;
        $scope.model_def = SolutionDefinition.originalElement;
        $scope.solution = {};

        $scope.remove = function remove(solution) {
            solution = solution || $scope.solution;
            if (window.confirm('Are you sure you want to delete this solution?')) {
                return resourceService.remove(solution, $scope.solutions);
            }
        };

        $scope.save = function save(solution) {
            solution = solution || $scope.solution;
            return resourceService.save(solution, $scope.solutions)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleSolutionCtrl($scope, $stateParams, Solutions, SolutionDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.solution = _.find(Solutions, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
