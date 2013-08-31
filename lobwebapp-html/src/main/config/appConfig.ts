///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>

///<reference path='../controller/ListProductController.ts'/>

///<reference path='../service/contract/base/EntityService.ts'/>
///<reference path='../service/contract/ProductService.ts'/>
///<reference path='../service/mock/base/AbstractEntityServiceMock.ts'/>
///<reference path='../service/mock/DefaultProductServiceMock.ts'/>


var routeProviderCfg = ($routeProvider: ng.IRouteProvider) => {
    $routeProvider
        .when('/', {redirectTo: '/product'})
        .when('/product', { templateUrl: 'views/product/listProduct.html', 
                            controller: controller.ListProductController,
                            caseInsensitiveMatch: true})
        .when('/product/:productId', { templateUrl: 'views/product/editProduct.html',
                            controller: controller.EditProductController,
                            caseInsensitiveMatch: true})
        .otherwise({redirectTo: '/'});
}

var locationProviderCfg = ($locationProvider: ng.ILocationProvider) => {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');  
}

//////////

angular.module('lobwebapp-html', ['$strap.directives']) 
       
       .service('$productService', () => new service.mock.DefaultProductServiceMock())
  
       .config(['$routeProvider', routeProviderCfg])       
       .config(['$locationProvider', locationProviderCfg])
       
       ;


