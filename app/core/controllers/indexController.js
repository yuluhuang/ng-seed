(function () {
  'use strict';
  var app = angular.module('app.indexController', ['app.apiService', 'app.directives.footer'], angular.noop);

  app.controller('indexController', function ($scope, $state, $location, $timeout, Feed, LoanOrder, $q, globalValue, $stateParams, $sce) {
    var vm = $scope.vm = {};
    vm.isCollapseMin = false;
    vm.img = 'a.b.com(filter case)'; // 测试过滤器

    $scope.toAbout = function () {
      $state.go('index.about');
    };

    // 并行请求
    // var p = Menu.getMenuTree();
    // var p2 = LoanOrder.getWorkbench();
    // var all = $q.all([p, p2]);
    // p.then(function(res){console.log(res)});
    // all.then(function(res){console.log(res)});

    // 使用 html 的正确姿势
    // $scope.innerHtml = function () {
    //   // 插入html
    //   var aaaa = '<embed width='800' height='600' src='' + $scope.docpdf + ''></embed>';
    //   $scope.iframeHtml = $sce.trustAsHtml(aaaa);
    // };



  });

  app.controller('indexLeftBarController', function ($scope, $timeout, $state, $location, $stateParams, Menu, globalValue) {
    var vm = $scope.vm = {};
    vm.bars = [
      {
        name: 'index',
        path: '/index',
        selected: true
      },
      {
        name: 'emit',
        path: '/index/emit',
        selected: false
      },
      {
        name: 'form',
        path: '/index/form',
        selected: false
      },
      {
        name: 'filter',
        path: '/index/filter',
        selected: false
      },
      {
        name: 'table',
        path: '/index/table',
        selected: false
      }
    ];

    vm.togo = function (path) {
      for (var i = 0; i < vm.bars.length; i++) {
        var v = vm.bars[i];
        v.selected = false;
        if (v.path == path) {
          v.selected = true;
        }
      }
      $location.path(path);
    };
    // 刷新后设置
    vm.togo($location.path())

  });

  app.controller('indexMainController', function ($scope, $state, $location, $templateCache, Feed) {
    var vm = $scope.vm = {};
    $scope.toIndex = function () {
      $state.go('index');
      // $location.path('index');
    };

    var tmp = '<h4>template2</h4>'
      + '<p>这是直接调用$templateCache服务获取模板文件的方式</p>' +
      '<div class="btn btn-primary" ng-click="toAbout()">路由跳转-index/about</div>';
    $templateCache.put('template2.html', tmp);




    Feed.getRecentFeed().then(function (res) {
      if (res.code === 200) {
        console.log(res)
        vm.feedList = res.feeds
      }
    })
    Feed.getRecentPdf().then(function (res) {
      if (res.code === 200) {
        console.log(res)
        vm.pdfList = res.list
      }
    }).catch(function (err) {
      var pdfList = [];
      for (var i = 0; i < 5; i++) {
        var tmp = {};
        tmp.title = moment().subtract(i, 'day').format("YYYY-MM-DD");
        pdfList.push(tmp);
      }
      vm.pdfList = pdfList;
    })
  });

  app.controller('indexHeaderController', function ($scope, $state, $location) {
    var vm = $scope.vm = {};
    vm.one = false;
    vm.two = false;
    vm.oneFn = function () {
      vm.one = !vm.one;
    };
    vm.twoFn = function () {
      vm.two = !vm.two;
    };
  });

  app.controller('indexTableController', function ($scope, $state, $location, LoanOrder) {
    var vm = $scope.vm = {};
    LoanOrder.getWorkbench({pageNum: 1, pageSize: 15}).then(function (response) {
      if (!response.code) {
        vm.lists = response.data;
        vm.page = response.page
      }
    })

    $scope.toIndex = function () {
      $state.go('index');
      // $location.path('index');
    };

  });

  app.controller('indexNavBarController', function ($scope, $state, $location) {
    var vm = $scope.vm = {};
    vm.breadcrumb = $location.path().substr(1).split('/');


    $scope.$on("locationChange", function (event, msg) {
      vm.breadcrumb = msg.split('#/')[1].split('/');
    });
  });

  app.controller('formController', function ($scope, $state) {
    var vm = $scope.vm = {};
    vm.radio = 'AA'


    vm.show = function () {
      console.log($scope.a);
    }
  });

  app.controller('filterController', function ($scope, $state) {
    var vm = $scope.vm = {};
    vm.amount = 1234.56;

    vm.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    vm.letters = "abcdefghi";
    vm.numLimit = 3;
    vm.letterLimit = 3;

    vm.val = 1234.56789;


    vm.friends =
      [{name: 'John', phone: '555-1212', age: 10},
        {name: 'Mary', phone: '555-9876', age: 19},
        {name: 'Mike', phone: '555-4321', age: 21},
        {name: 'Adam', phone: '555-5678', age: 35},
        {name: 'Julie', phone: '555-8765', age: 29}];
    vm.predicate = '-age';

  });

  app.controller('emitController', function ($scope, $state) {

    var vm = $scope.vm = {};
    $scope.$on("emi", function (event, msg) {
      vm.emit2_msg = msg;
    });
    vm.emit1 = function () {
      $scope.$broadcast("emi", vm.emit1_msg);
    }
    // 全局广播，先注册
    $scope.$on("__broadcast__", function (event, msg) {
      vm.emit2_msg = msg;
    });
    $scope.$emit("__emit__", 222);

  });

  app.controller('aboutController', function ($scope, $state, $location) {
    $scope.toIndex = function () {
      $state.go('index');
      // $location.path('index');
    };

  });
})();
