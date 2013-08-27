///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>

angular.module('lobwebapp-html', [])
  .config(function ($routeProvider : ng.IRouteProvider, $locationProvider : any) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', { templateUrl: 'views/main.html', controller: 'MainCtrl' })
      .when('/product',{ templateUrl: 'views/product.html', controller: 'ProductCtrl' })
      .otherwise({ redirectTo: '/product' });
  });