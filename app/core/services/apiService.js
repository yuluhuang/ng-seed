(function () {
  'use struct';
  angular.module('app.apiService', ['app.baseService'])

    .factory('Login', ['baseService', '$q', function (baseService, $q) {
      return {
        // 获取公钥
        getPublicKey: function (data) {
          var defer = $q.defer();
          baseService.save({module: 'login', param: 'authorKey'}, data, function (data) {
            defer.resolve(data);
          });
          return defer.promise;
        },
        // 登录
        doLogin: function (data) {
          var defer = $q.defer();
          baseService.save({module: 'login', param: 'doLogin'}, data, function (data) {
            defer.resolve(data);
          });
          return defer.promise;
        },
        // 登录
        doAuth: function (data) {
          var defer = $q.defer();
          baseService.save({module: 'login', param: 'doAuth'}, data, function (data) {
            defer.resolve(data);
          });
          return defer.promise;
        }
      }
      // var self = this;
      //
      // // 获取公钥
      // self.getPublicKey = function (data) {
      //   var defer = $q.defer();
      //   baseService.post({module: 'login', param: 'authorKey'}, data, function (data) {
      //     defer.resolve(data);
      //   });
      //   return defer.promise;
      // };
      //
      // // 登录
      // self.doLogin = function (data) {
      //   var defer = $q.defer();
      //   baseService.post({module: 'login', param: 'doLogin'}, data, function (data) {
      //     defer.resolve(data);
      //   });
      //   return defer.promise;
      // };
      //
      // // 登录
      // self.doAuth = function (data) {
      //   var defer = $q.defer();
      //   baseService.post({module: 'login', param: 'doAuth'}, data, function (data) {
      //     defer.resolve(data);
      //   });
      //   return defer.promise;
      // };


    }])

      .factory('Feed', ['baseService', '$q', function (baseService, $q) {
        return {
          getRecentFeed: function () {
            var defer = $q.defer();
            baseService.get({module: 'pull_feed', param: 'recent_add'}, {}, function (data) {defer.resolve(data);}, function (err) {
              defer.reject('error: ' + err)
            })
            return defer.promise;
          },
          getRecentPdf: function () {
            var defer = $q.defer();
            baseService.get({module: 'pdf', param: 'recent'}, {}, function (data) {defer.resolve(data);}, function (err) {
              defer.reject('error: ' + err)
            })
            return defer.promise;
          },
          getDay: function () {
            var defer = $q.defer();
            baseService.get({module: 'day', param: 'get'}, {}, function (data) {defer.resolve(data);}, function (err) {
              defer.reject('error: ' + err)
            })
            return defer.promise;
          }
        }
      }])

    .factory('Menu', ['baseService', '$q', function (baseService, $q) {
      return {
        getMenuTree: function () {
          var defer = $q.defer();
          baseService.save({module: 'menu', param: 'tree'}, {}, function (data) {defer.resolve(data);}, function (err) {
            defer.reject('error: ' + err)
          })
          return defer.promise;
        }
      }
    }])

    .factory('LoanOrder', ['baseService', '$q', function (baseService, $q) {
      return {
        getWorkbench: function (data) {
          var defer = $q.defer();
          baseService.save({module: 'loanOrder', param: 'workbench'}, data, function (data) {
            defer.resolve(data);
          })
          return defer.promise;
        }
      }
    }])
})();
