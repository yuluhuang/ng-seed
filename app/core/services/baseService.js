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

  app.factory('sessionStorageFactory', function () {
    return {
      get: function (key) {
        return sessionStorage.getItem(key);
      },
      set: function (key, value) {
        sessionStorage.setItem(key, value);
      }
    }
  });
  app.factory('uuidFactory', function () {
    return {
      randomUUID: function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;

        if (len) {
          // Compact form
          for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
          // rfc4122, version 4 form
          var r;

          // rfc4122 requires these characters
          uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
          uuid[14] = '4';

          // Fill in random data.  At i==19 set the high bits of clock sequence as
          // per rfc4122, sec. 4.1.5
          for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
              r = 0 | Math.random() * 16;
              uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
          }
        }
        return uuid.join('');
      },
    }
  });
})();



