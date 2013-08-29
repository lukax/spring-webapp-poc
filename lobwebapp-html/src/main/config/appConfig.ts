///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>

///<reference path='../controller/ListProductController.ts'/>

///<reference path='../service/contract/base/EntityService.ts'/>
///<reference path='../service/contract/ProductService.ts'/>
///<reference path='../service/mock/base/AbstractEntityServiceMock.ts'/>
///<reference path='../service/mock/DefaultProductServiceMock.ts'/>

angular.module('lobwebapp-html', []) 
       
       .service('$productService', function(){
    		  return new service.mock.DefaultProductServiceMock();
        })


       .config(['$routeProvider', function($routeProvider: ng.IRouteProvider){
       		$routeProvider
                .when('/', {redirectTo: '/product'})
                .when('/product', { templateUrl: 'views/product/listProduct.html', 
                                    controller: controller.ListProductController,
                                    caseInsensitiveMatch: true})
     					  .otherwise({redirectTo: '/'});

       	}])
       
       .config(['$locationProvider', function($locationProvider : ng.ILocationProvider){
                //$locationProvider.html5Mode(true);
                $locationProvider.hashPrefix('!');
        }])
       
         ;
