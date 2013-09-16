///<reference path='../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='../controller/product/ListProductController.ts'/>
///<reference path='../controller/product/EditProductController.ts'/>
///<reference path='ServiceModule.ts'/>

module lwa.modularity{    

    export class ControllerModule{
        private controllerNgModule: ng.IModule;
        private serviceModule: modularity.ServiceModule;
        private routeProviderCfg = ($routeProvider: ng.IRouteProvider) => {
                $routeProvider
                    .when('/', {redirectTo: '/product/list'})
                    .when('/product/list', { templateUrl: 'views/product/listProduct.html', controller: 'ListProductCtrl'})
                    .when('/product/:productId/:mode?', { templateUrl: 'views/product/editProduct.html', controller: 'EditProductCtrl'})
                    .otherwise({redirectTo: '/'});
        };
        private locationProviderCfg = ($locationProvider: ng.ILocationProvider) => {
                $locationProvider.html5Mode(true); 
        };

        constructor(){
            this.serviceModule = new modularity.ServiceModule().configure();
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
                ;
                 
            return this;
        }
    }
}