(function () {
  'use struct';
  var app = angular.module('base.config', []);

  /**
   * @ngdoc service
   * @name app.baseService
   * @description
   * set base url
   */
  app.service('baseConfig', function () {
    /**
     * @ngdoc
     * @name app.baseService#getBaseUrl
     * @methodOf app.baseService
     * @description
     * base url
     * @example
     * baseService.getBaseUrl();
     * @returns {string}
     */
    this.getBaseUrl = function () {
      var baseurl = envConfig.baseUrl || "http://localhost:18080/";

      return baseurl;
    };

  });

})();


