///<reference path='../../../ts-definitions/DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../controller/ListProductController.ts'/>
///<reference path='../service/contract/base/EntityService.ts'/>
///<reference path='../service/contract/ProductService.ts'/>
///<reference path='../service/contract/util/AlertService.ts'/>
///<reference path='../service/mock/base/AbstractEntityServiceMock.ts'/>
///<reference path='../service/mock/DefaultProductServiceMock.ts'/>
///<reference path='../service/impl/util/DefaultAlertService.ts'/>

module module{
    export class App {
        private appModule: ng.IModule;
        private serviceModule: module.ServiceModule;
        private controllerModule: module.ControllerModule;

        constructor() {   
            this.serviceModule = new module.ServiceModule().configure();
            this.controllerModule = new module.ControllerModule().configure();
            this.appModule = angular.module('lwa', ['lwaControllerModule','$strap.directives']);
        }
    
        configure(){
            var routeProviderCfg = ($routeProvider: ng.IRouteProvider) => {
                $routeProvider
                    .when('/', {redirectTo: '/product'})
                    .when('/product', { templateUrl: 'views/product/listProduct.html', 
                                        controller: 'ListProductCtrl',
                                        caseInsensitiveMatch: true})
                    .when('/product/:productId', { templateUrl: 'views/product/editProduct.html',
                                        controller: 'EditProductCtrl',
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
           
            this.appModule                        
                .config(['$routeProvider', routeProviderCfg])       
                .config(['$locationProvider', locationProviderCfg])
                .directive('lwaProgress', lobProgressDirective)
                ;    
            return this;
        }
    }
}

//Initialize application
new module.App().configure();