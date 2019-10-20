(function () {
  var app = angular.module('app.myHttpInterceptor', ['app.baseService']);
  app.factory('myInterceptor', [
    '$q', 'localStorageFactory', function ($q, localStorageFactory) {
      return {
        // optional method
        'request': function (config) {
          // do something on success
          //
          // config.headers['Authorization'] = 'Bearer ' + localStorageFactory.get('token');
          return config;
        },

        // optional method
        'requestError': function (rejection) {
          // do something on error
          if (canRecover(rejection)) {
            return responseOrNewPromise;
          }
          return $q.reject(rejection);
        },

        'response': function (response) {
          // do something on success
          // response.status === 200
          //response:{data: Object, status: 200, headers: function, config: Object}
          // switch (response.status) {
          //   case 1003:
          //     location.href = "login.html";
          //   case 200:
          //     break;
          //
          // }
          switch (response.data.code) {
            case 1003:
              location.href = "login.html";
              break;
            case 200:
              break;

          }
          return response || $q.when(response);
        },
        'responseError': function (rejection) {
          //alert(JSON.stringify(rejection));
          // do something on error
          // Executed only when the XHR response has an error status code
          //console.info("rejection", rejection);
          switch (rejection.status) {
            case 401:
              rejection.data = {
                status: 401,
                description: 'unauthorized'
              };
              return rejection.data;

            case 404:
              location.href = "error/404.html";
              break;
            case 500:
              location.href = "error/500.html";
              break;

          }

          /*
           $q.reject creates a promise that is resolved as
           rejected with the specified reason.
           In this case the error callback will be executed.
           */
          return $q.reject(rejection);
        }
      };
    }
  ]);
})();
