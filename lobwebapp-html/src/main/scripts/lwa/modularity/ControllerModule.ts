///<reference path='./../../../../../ts-definitions/angularjs/angular.d.ts'/>
///<reference path='./../../../../../ts-definitions/requirejs/require.d.ts'/>
///<reference path='./../controller/product/ListProductController.ts'/>
///<reference path='./../controller/product/EditProductController.ts'/>
///<reference path='./../controller/user/AuthUserController.ts'/>
///<reference path='./../service/contract/AuthService.ts'/>
///<reference path='./ServiceModule.ts'/>

declare module 'angularRoute' { export = any;}
declare module 'plugins/ekathuwa' { export = any; }
declare module 'underscoreString' { export = any; }
declare var _ : any;

import angular = require('angular');
import ngRoute = require('angularRoute');
import ngEkathuwa = require('plugins/ekathuwa');
import modularity = require('./ServiceModule');
import controller_product_e = require('./../controller/product/EditProductController');
import controller_product_l = require('./../controller/product/ListProductController');
import controller_user_l = require('./../controller/user/AuthUserController');
import service_auth = require('./../service/contract/AuthService')
import _ = require('underscore');
import _str = require('underscoreString');

export class ControllerModule{
    private controllerNgModule: ng.IModule;
    private serviceModule: modularity.ServiceModule;
    private routeProviderCfg = ($routeProvider: ng.IRouteProvider) => {
            $routeProvider
                .when('/', {redirectTo: '/user/auth'})
                .when('/user/auth', { templateUrl: 'views/user/authUser.html', controller: 'AuthUserCtrl' })
                .when('/product/list', { templateUrl: 'views/product/listProduct.html', controller: 'ListProductCtrl'})
                .when('/product/:productId/:mode?', { templateUrl: 'views/product/editProduct.html', controller: 'EditProductCtrl'})
                .otherwise({redirectTo: '/'});
    };
    private locationProviderCfg = ($locationProvider: ng.ILocationProvider) => {
        $locationProvider.html5Mode(true); 
    };
    private authWatcherCfg = ($rootScope: ng.IRootScopeService, $location: ng.ILocationService, AuthService: service_auth.AuthService) => {
        var loginRoute = ['/user/auth'];
        var routeClean = (route) => {
            return _.find(loginRoute, (notLoginRoute) => {
                return _.str.startsWith(route, notLoginRoute);
            });
        }

        $rootScope.$on('$routeChangeStart', (event, next, current) => {
            if(!routeClean($location.url()) && !AuthService.isLoggedIn()) {
                $location.path('/user/auth');
            }
        })
    }

    constructor() {
        ngRoute;   //TODO: Find a way around this ugly hack
        ngEkathuwa;
        _str;
        this.serviceModule = new modularity.ServiceModule().configure();
        this.controllerNgModule = angular.module('lwaControllerModule', ['lwaServiceModule', 'ngRoute', 'ngEkathuwa']);
    }

    configure(){
        this.controllerNgModule
            .config(['$routeProvider', this.routeProviderCfg])
            .config(['$locationProvider', this.locationProviderCfg])
            .run(['$rootScope', '$location', 'AuthService', this.authWatcherCfg])

            .controller('AuthUserCtrl', controller_user_l.AuthUserController)
            .controller('ListProductCtrl', controller_product_l.ListProductController)
            .controller('EditProductCtrl', controller_product_e.EditProductController)
            ;
                 
        return this;
    }
}