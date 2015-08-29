(function(ng, _) {

    'use strict';

    ng.module('SimplePCMS')
        .controller('ScoreCtrl', ScoreCtrl)
        .controller('SingleScoreCtrl', SingleScoreCtrl);

    function ScoreCtrl($scope, $state, Scores, ScoreDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('scores'.toLowerCase());
        
        $scope.scores = Scores;
        $scope.model_def = ScoreDefinition.originalElement;
        $scope.score = {};

        $scope.remove = function remove(score) {
            score = score || $scope.score;
            if (window.confirm('Are you sure you want to delete this score?')) {
                return resourceService.remove(score, $scope.scores);
            }
        };

        $scope.save = function save(score) {
            score = score || $scope.score;
            return resourceService.save(score, $scope.scores)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleScoreCtrl($scope, $stateParams, Scores, ScoreDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.score = _.find(Scores, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
