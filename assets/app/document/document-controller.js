(function(ng, _) {

  'use strict';

  ng.module('SimplePCMS')
    .controller('DocumentCtrl', DocumentCtrl)
    .controller('SingleDocumentCtrl', SingleDocumentCtrl)
    .controller('SingleSolutionCtrl', SingleSolutionCtrl)
    .controller('SingleProblemCtrl', SingleProblemCtrl);

  function DocumentCtrl($scope, $state, Documents, DocumentDefinition, SailsResourceService, $window) {
    var resourceService = new SailsResourceService('documents');

    $scope.docs = [];
    $scope.documents = Documents;
    $scope.model_def = DocumentDefinition.originalElement;
    $scope.document = {attachment: []};
    $scope.documentTypes = ['page','problem']; // Eeyup, hardcoded bro
    $scope.document.type = $scope.documentTypes[0];
    $scope.message = { msg: '', type:'' };

    $scope.remove = function remove(document) {
      document = document || $scope.document;
      if (window.confirm('Are you sure you want to delete this document?')) {
        return resourceService.remove(document, $scope.documents);
      }
    };

    $scope.save = function save(document) {
      document = document || $scope.document;

      return resourceService.save(document, $scope.documents)
            .then(function() {
              $scope.document = {attachment: []};
              $state.go('^.list');
            }, function(err) {
              console.error('An error occured: ' + err);
            });
    };

    $scope.getUserType = function()
    {
        if($window.sessionStorage.token == undefined)
        {
          $state.go('home');
        }
        else
        {
          var base64Url = $window.sessionStorage.token.split('.')[1];
          var base64 = base64Url.replace('-', '+').replace('_', '/');
          var user = JSON.parse($window.atob(base64));
          var rol = user.rol;
          return rol;
        }
    };

    $scope.getOwnerName = function()
    {
      var base64Url = $window.sessionStorage.token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      var user = JSON.parse($window.atob(base64));
      return user.name;
    }

    $scope.getDocuments = function()
    {
      $scope.docs = []
      for(var i = 0; i < $scope.documents.length; i++)
      {
        var itemDocuments = $scope.documents[i];
        if($scope.docs.length === 0 && itemDocuments.type === 'code')
        {
          $scope.docs.push(itemDocuments);
        }
        else if(itemDocuments.type === 'code')
        {
            var exists = 0;
            for(var j = 0; j < $scope.docs.length; j++)
            {
                var itemDocs = $scope.docs[j];
                if(itemDocs.ownerName === itemDocuments.ownerName)
                {
                  exists = 1;
                  break;
                }
            }
            if(exists === 0)
            {
              $scope.docs.push(itemDocuments);
            }
        }
      }
      return $scope.docs
    };

    $scope.getTotal = function(user)
    {
        user = user ;
        var total = 0;
        for(var i = 0; i < $scope.documents.length; i++)
        {
          if($scope.documents[i].ownerName === user && $scope.documents[i].type === 'code')
          {
              total = total + $scope.documents[i].ownerScore;
          }
        }
        return parseInt(total);
    };

    $scope.saveQualify = function saveQualify(document) {
      document = document || $scope.document;

      return resourceService.save(document, $scope.documents)
            .then(function() {
              $scope.document = {attachment: []};
              $state.go('^.solutions');
            }, function(err) {
              console.error('An error occured: ' + err);
            });
    };

    $scope.switchFileInput = true;
    $scope.switchFileOutput = true;

    $scope.onReaded = function( e, file, typeString ){
      var index = typeString === 'input' ? 0 : 1;
      $scope.document.attachment[index] = {'type': typeString, 'content': e.target.result };
      //console.log($scope.document.attachment);
    }
  }

  function SingleDocumentCtrl($scope, $stateParams, Documents, DocumentDefinition) {
    $scope.documentTypes = ['page','problem']; // Eeyup, hardcoded bro /)

    $scope.document = _.find(Documents, {
      id: $stateParams.id
    });
  }

  function SingleSolutionCtrl($scope, $stateParams, Documents, DocumentDefinition)
  {
    $scope.document = _.find(Documents, {
      id: $stateParams.id
    });
  }


  function SingleProblemCtrl($scope, $stateParams, Documents, Restangular) {

    $scope.document = _.find(Documents, {
      id: $stateParams.id
    });

    $scope.solution = {};

    $scope.readFile = function(e, file, flag) {
      if (flag === 'output'){
        $scope.solution.output = e.target.result;
      } else {
        $scope.solution.code = e.target.result;
      };
    }

    $scope.feedback = [
      //{ type: 'info', msg: 'Submit your solution here' }
    ];

    $scope.closeAlert = function(index) {
      $scope.feedback.splice(index, 1);
    };

    $scope.submitSolution = function(solution) {
      solution = solution || $scope.solution;

      if ( ! _.isEmpty( solution ) && !_.isEmpty(solution.output) )
        return $scope.document.post('solution', solution)
        .then(function(data) {
          $scope.feedback.push({type: data.type, msg: data.msg });
        }, function(err){
          console.log("Error while uploading", err);
        });
    }
  }

})(
    window.angular,
    window._
);
