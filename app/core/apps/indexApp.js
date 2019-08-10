(function () {
  'use strict';

  var app = angular.module("indexApp", ['ui.router', "app.indexController", 'app.myHttpInterceptor', 'angular-loading-bar', 'ngAnimate', 'ngSanitize', 'app.filter'], angular.noop);

// value 不可在config里注入
  app.value('globalValue', {"name": "ylh"});
// constant 可在config里注入
  app.constant('globalConstant', {"qq": "504367857@qq.com"});
  app.config(['$locationProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider',
    function ($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

      // $locationProvider.hashPrefix('!');
      // $locationProvider.html5Mode(true);
      $httpProvider.interceptors.push('myInterceptor');

      // 具体参数参考包中文档
      // 在baseService中配置使用
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.includeBar = true;
      // cfpLoadingBarProvider.latencyThreshold = 500;

      $stateProvider
        .state('index', {
          url: '/index',
          views: {
            '': {
              templateUrl: 'view/index/index.html',
              controller: 'indexController'

            },
            'main@index': {
              templateUrl: 'view/index/layout/main.html',
              controller: 'indexMainController'
            },
            'navBar@index': {
              templateUrl: 'view/index/layout/navBar.html',
              controller: 'indexNavBarController'
            },
            'leftBar@index': {
              templateUrl: 'view/index/layout/leftBar.html',
              controller: 'indexLeftBarController'
            },
            'headerBar@index': {
              templateUrl: 'view/index/layout/headerBar.html',
              controller: 'indexHeaderController'
            },
            'footer@index': {
              templateUrl: 'view/index/layout/footer.html',
              controller: 'indexController'
            }
          }
        })
        .state('index.table', {
          url: '/table',
          views: {
            'main@index': {
              templateUrl: 'view/index/table.html',
              controller: "indexTableController"
            }
          }
        })
        .state('index.form', {
          url: '/form',
          views: {
            'main@index': {
              templateUrl: 'view/index/form.html',
              controller: "formController"
            }
          }
        })
        .state('index.emit', {
          url: '/emit',
          views: {
            'main@index': {
              templateUrl: 'view/index/emit.html',
              controller: "emitController"
            }
          }
        })
        .state('index.filter', {
          url: '/filter',
          views: {
            'main@index': {
              templateUrl: 'view/index/filter.html',
              controller: "filterController"
            }
          }
        })
        .state('index.about', {
          url: '/about',
          views: {
            'main@index': {
              templateUrl: 'view/index/about.html',
              controller: "aboutController"
            }
          }
        })
        .state("about", {
          url: "/about",
          templateUrl: "view/index/about.html",
          controller: "aboutController"
        });


      $urlRouterProvider.otherwise('/index');
    }]);

  app.run(function ($http, $rootScope, $rootElement) {
    // 监听路由变化
    $rootScope.$on("$locationChangeStart", function(event, next, current) {
      // handle route changes
      $rootScope.$broadcast("locationChange", next);
    });
    // 全局监听
    $rootScope.$on("__emit__", function(event, data) {
      // handle route changes
      $rootScope.$broadcast("__broadcast__", data);
    });
  });

})();
