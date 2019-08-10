/**
 *
 priority: 这个值设置指令的权重，默认是 0 。当一个节点中有多个指令存在时，就按着权限从大到小的顺序依次执行它们的 compile 函数。相同权重顺序不定。
 terminal: 是否以当前指令的权重为结束界限。如果这值设置为 true ，则节点中权重小于当前指令的其它指令不会被执行。相同权重的会执行。
 restrict: 指令可以以哪些方式被使用，可以同时定义多种方式。
     E 元素方式 <my-directive></my-directive>
     A 属性方式 <div my-directive="exp"> </div>
     C 类方式 <div class="my-directive: exp;"></div>
     M 注释方式 <!-- directive: my-directive exp -->
 transclude: 可以是 'element' 或 true 两种值。
 compile: 基本的定义函数。 function compile(tElement, tAttrs, transclude) { ... }
 link: 只有 compile 未定义时 link 才会被尝试。 function link(scope, iElement, iAttrs, controller) { ... }
 scope: scope 的形式。 false 节点的 scope ， true 继承创建一个新的 scope ， {} 不继承创建一个新的隔离 scope 。 {@attr: '引用节点属性', =attr: '把节点属性值引用成scope属性值', &attr: '把节点属性值包装成函数'}
 controller: 为指令定义一个 controller ， function controller($scope, $element, $attrs, $transclude) { ... }
 name: 指令的 controller 的名字，方便其它指令引用。
 require: 要引用的其它指令 conroller 的名字， ?name 忽略不存在的错误， ^name 在父级查找。
 template: 模板内容。
 templateUrl: 从指定地址获取模板内容。
 replace: 是否使用模板内容替换掉整个节点， true 替换整个节点， false 替换节点内容。
 */
var app = angular.module('app.directives.footer', []);
app.directive('footerBar', function () {
  return {
    restrict: 'AE',
    controller: [
      '$scope',
      '$element',
      '$attrs',
      function ($scope, $element, $attrs) {
      }
    ],
    templateUrl: 'core/directives/footer.html',
    scope: {},
    link: function ($scope, $element, $attrs) {
      $(document).ready(function () {
      });
    }
  };
});
app.directive('scroll', function () {
  return function ($scope, $element, $attr) {
    setTimeout(function () {
      $(window).scrollTop(0);
    }, 10)

  }
});
