var app = angular.module('app.filter', []);
app.filter('imgPrefix', function () {
  var img = function (input) {
    return 'https://' + input;
  };
  return img;
});
