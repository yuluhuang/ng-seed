(function () {
  'use strict';

  var app = angular.module('app.directives.login', ['app.apiService']);
  app.directive('login', ['Login', 'localStorageFactory', function (Login, localStorageFactory) {
    return {
      restrict: 'AE',
      controller: [
        '$scope',
        '$element',
        '$attrs',
        function ($scope, $element, $attrs) {
          var vm = $scope.vm = {};
          vm.userName = 'guest';
          vm.password = 'guest';
          vm.email = '504367857@qq.com';

          $scope.submit = function (form) {
            Login.getPublicKey().then(function (response) {
              if (!response.code) {
                Login.doLogin().then(function (res) {
                  localStorageFactory.set('token', res.data.token);
                  localStorageFactory.set('user', JSON.stringify(res.data.loginInfo));
                  location.href = 'index.html';
                })
              }
            })
          }

        }
      ],
      scope: {},
      templateUrl: 'js/directives/login.html',
      link: function ($scope, $element, $attrs) {
      }
    };
  }]);
})();
