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

var lobProgressDirective = () => {
  return {
            replace:true,
            transclude:true,
            restrict:"E",
            template:
                '<div class="progress progress-striped active">'
                  +'<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">'
                  +'</div>'
              +'</div>'
        }
}

/////////////////////////////////////////////////////////////////////////////////////////////

angular.module('lobwebapp-html', ['$strap.directives']) 
       
       .service('_productService', ['$timeout', ($timeout: ng.ITimeoutService)=> new service.mock.DefaultProductServiceMock($timeout)])
       .service('_alertService', () => new service.impl.util.DefaultAlertService()) 

       .config(['$routeProvider', routeProviderCfg])       
       .config(['$locationProvider', locationProviderCfg])
       
       .directive('lobprogress', lobProgressDirective)
       ;


