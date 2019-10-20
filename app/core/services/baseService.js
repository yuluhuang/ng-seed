(function () {
  var app = angular.module('app.baseService', ['base.config', "ngResource"]);

  app.service('baseService', ['$resource', 'baseConfig', function ($resource, baseConfig) {

    var baseurl = baseConfig.getBaseUrl();
    return $resource(baseurl + 'api/' + ':module' + '/' + ':param', {ignoreLoadingBar: true});
  }]);

  /**
   *
   * 自定义请求服务
   */
  app.service('restService', ['$resource', 'baseConfig', function ($resource, baseConfig) {

    var baseurl = baseConfig.getBaseUrl();
    return $resource(baseurl + ':module' + '/' + ':param',
      {},
      {
        query: {
          method: "GET",
          params: {},
          headers: {
            "content-type": 'application/json'
          },
          withCredentials: true,
          isArray: true
        },
        get: {
          method: "GET",
          params: {},
          headers: {
            "content-type": 'application/json'
          },
          withCredentials: true,
          isArray: false
        },
        post: {
          method: "POST",
          params: {},
          headers: {
            "Content-Type": 'application/json'
          },
          data: {},
          // withCredentials: true,
          isArray: false
        },
        save: {
          method: "POST",
          params: {},
          headers: {
            "Content-Type": 'application/json'
          },
          data: {},
          // withCredentials: true,
          isArray: true
        }
      });
  }]);

  app.factory('localStorageFactory', ['$window', function ($window) {
    return {
      set: setObjectLocalStorage,
      get: getObjectLocalStorage,
      remove: removeLocalStorage,
      clear: clearLocalStorage
    }

    // function setLocalStorage(key, value) {
    //   $window.localStorage[key] = value;
    // }
    //
    // function getLocalStorage(key, defaultValue) {
    //   return $window.localStorage[key] || defaultValue || false;
    // }

    function setObjectLocalStorage(key, objectValue) {
      $window.localStorage[key] = angular.toJson(objectValue);
    }

    function getObjectLocalStorage(key, defaultObjectValue) {
      if ($window.localStorage && $window.localStorage[key] != undefined) {
        return angular.fromJson($window.localStorage[key]);
      } else {
        return defaultObjectValue || false;
      }
    }

    function removeLocalStorage(key) {
      $window.localStorage.removeItem(key);
    }

    function clearLocalStorage() {
      $window.localStorage.clear();
    }
  }]);

})();



