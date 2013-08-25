'use strict';

angular.module('lobwebappHtmlApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).when('/product',{
        templateUrl: 'views/product.html',
        controller: 'ProductCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  });//.config(['$httpProvider', function($httpProvider) {
    //delete $httpProvider.defaults.headers.common["Accept"];
//}]);