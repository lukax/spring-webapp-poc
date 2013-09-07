///<reference path='../../DefinitelyTyped/angularjs/angular.d.ts'/>
///<reference path='../controller/ListProductController.ts'/>
///<reference path='../controller/EditProductController.ts'/>

module lwa.module{
    import controller = lwa.controller;
    import module = lwa.module;
    
    export class ControllerModule{
        private controllerNgModule: ng.IModule;
        private serviceModule: module.ServiceModule;
        private routeProviderCfg = ($routeProvider: ng.IRouteProvider) => {
                $routeProvider
                    .when('/', {redirectTo: '/product'})
                    .when('/product', { templateUrl: 'views/product/listProduct.html', 
                                        controller: 'ListProductCtrl'})
                    .when('/product/:productId', { templateUrl: 'views/product/editProduct.html',
                                        controller: 'EditProductCtrl'})
                    .otherwise({redirectTo: '/'});
        };
        private locationProviderCfg = ($locationProvider: ng.ILocationProvider) => {
                $locationProvider.html5Mode(true); 
        };

        constructor(){
            this.serviceModule = new module.ServiceModule().configure();
            this.controllerNgModule = angular.module('lwaControllerModule',['lwaServiceModule','ngRoute','ngEkathuwa']);
        }
        
        configure(){
            this.controllerNgModule
                .config(['$routeProvider', this.routeProviderCfg])       
                .config(['$locationProvider', this.locationProviderCfg])
                
                .controller('ListProductCtrl', ['$scope', '$location', '$routeParams',
                                                '_productService', '_alertService',
                                                '$ekathuwa', 
                                                controller.ListProductController])        
                .controller('EditProductCtrl', ['$scope', '$location', '$routeParams', 
                                                '_productService', '_alertService', 
                                                '$ekathuwa',
                                                controller.EditProductController])
                .controller('appCtrl', ['$scope', ($scope: any) => { $scope.name = "test" }])
                 
            return this;
        }
    }
}