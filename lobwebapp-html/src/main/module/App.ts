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
        private appNgModule: ng.IModule;
        private controllerModule: module.ControllerModule;
        private directiveModule: module.DirectiveModule;
        private filterModule: module.FilterModule;
        private routeProviderCfg = ($routeProvider: ng.IRouteProvider) => {
                $routeProvider
                    .when('/', {redirectTo: '/product'})
                    .when('/product', { templateUrl: 'views/product/listProduct.html', 
                                        controller: 'ListProductCtrl',
                                        caseInsensitiveMatch: true})
                    .when('/product/:productId', { templateUrl: 'views/product/editProduct.html',
                                        controller: 'EditProductCtrl',
                                        caseInsensitiveMatch: true})
                    .otherwise({redirectTo: '/'});
        };
        private locationProviderCfg = ($locationProvider: ng.ILocationProvider) => {
                $locationProvider.html5Mode(true); 
        };
        
        constructor() {   
            this.directiveModule = new module.DirectiveModule().configure();
            this.filterModule = new module.FilterModule().configure();
            this.controllerModule = new module.ControllerModule().configure();
            this.appNgModule = angular.module('lw', ['lwDirectiveModule','lwFilterModule','lwControllerModule','$strap.directives']);
        }
    
        configure(){
            this.appNgModule                        
                .config(['$routeProvider', this.routeProviderCfg])       
                .config(['$locationProvider', this.locationProviderCfg])
                ;    
            return this;
        }
    }
}

//Initialize application
new module.App().configure();