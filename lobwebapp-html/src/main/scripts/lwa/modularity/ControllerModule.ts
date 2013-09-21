///<reference path='../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='../../../../../ts-definitions/requirejs/require.d.ts'/>
///<reference path='../controller/product/ListProductController.ts'/>
///<reference path='../controller/product/EditProductController.ts'/>
///<reference path='ServiceModule.ts'/>

declare module 'angularRoute' {}
declare module 'plugins/ekathuwa' {}

import angular = require('angular');
import ngRoute = require('angularRoute');
import ngEkathuwa = require('plugins/ekathuwa');
import modularity = require('./ServiceModule');
import controller_product_e = require('./../controller/product/EditProductController');
import controller_product_l = require('./../controller/product/ListProductController');

export class ControllerModule{
    private controllerNgModule: ng.IModule;
    private serviceModule: modularity.ServiceModule;
    private routeProviderCfg = ($routeProvider: ng.IRouteProvider) => {
            $routeProvider
                .when('/', {redirectTo: '/product/list'})
                .when('/login', { templateUrl: 'views/login.html' })
                .when('/product/list', { templateUrl: 'views/product/listProduct.html', controller: 'ListProductCtrl'})
                .when('/product/:productId/:mode?', { templateUrl: 'views/product/editProduct.html', controller: 'EditProductCtrl'})
                .otherwise({redirectTo: '/'});
    };
    private locationProviderCfg = ($locationProvider: ng.ILocationProvider) => {
        $locationProvider.html5Mode(true); 
    };

    constructor() {
        ngRoute;
        ngEkathuwa;
        this.serviceModule = new modularity.ServiceModule().configure();
        this.controllerNgModule = angular.module('lwaControllerModule', ['lwaServiceModule', 'ngRoute', 'ngEkathuwa']);
    }
        
    configure(){
        this.controllerNgModule
            .config(['$routeProvider', this.routeProviderCfg])
            .config(['$locationProvider', this.locationProviderCfg])

            .controller('ListProductCtrl', ['$scope', '$location', '$routeParams',
                '_productService', '_alertService',
                '$ekathuwa',
                controller_product_l.ListProductController])
            .controller('EditProductCtrl', ['$scope', '$location', '$routeParams',
                '_productService', '_alertService',
                '$ekathuwa',
                controller_product_e.EditProductController])
            ;
                 
        return this;
    }
}