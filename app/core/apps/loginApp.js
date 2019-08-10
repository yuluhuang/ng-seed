(function () {
  'use strict';
  angular.module('loginApp', ['app.directives.login'])
    .controller('loginCtrl', ['$scope', function ($scope) {
      var vm = $scope.vm = {};
    }]);
})();


