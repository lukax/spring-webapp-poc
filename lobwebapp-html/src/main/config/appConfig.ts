///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../controller/ListProductController.ts'/>
///<reference path='../service/contract/base/EntityService.ts'/>
///<reference path='../service/contract/ProductService.ts'/>
///<reference path='../service/contract/util/AlertService.ts'/>
///<reference path='../service/mock/base/AbstractEntityServiceMock.ts'/>
///<reference path='../service/mock/DefaultProductServiceMock.ts'/>
///<reference path='../service/impl/util/DefaultAlertService.ts'/>


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
}

//////////

angular.module('lobwebapp-html', ['$strap.directives']) 
       
       .service('_productService', () => new service.mock.DefaultProductServiceMock())
       .service('_alertService', () => new service.impl.util.DefaultAlertService()) 

       .config(['$routeProvider', routeProviderCfg])       
       .config(['$locationProvider', locationProviderCfg])
       
       ;


