///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>

///<reference path='../service/impl/DefaultProductService.ts'/>

///<reference path='../controller/EditProductController.ts'/>
///<reference path='../controller/ListProductController.ts'/>

angular.module('lobwebapp-html', [])
       .config(['$routerProvider', routerProviderCfg])
       .config(['$locationProvider', locationProviderCfg])
       .service('$productService', ($http : ng.IHttpService) => new service.impl.DefaultProductService($http));



var routerProviderCfg = function ($routeProvider : ng.IRouteProvider) {
    $routeProvider
      .when('/product',{ templateUrl: 'views/product/listProduct.html', controller: controller.ListProductController } )
      .when('/product/:productId',{ templateUrl: 'views/product/editProduct.html', controller: controller.EditProductController})
      .otherwise({ redirectTo: '/product' });
}  

var locationProviderCfg = function($locationProvider : ng.ILocationProvider){
    $locationProvider.html5Mode(true);
}