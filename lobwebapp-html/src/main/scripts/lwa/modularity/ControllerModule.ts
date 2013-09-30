///<reference path="./../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularRoute"/>
///<amd-dependency path="plugins/ekathuwa"/>
///<amd-dependency path="underscore"/>
///<amd-dependency path="underscoreString"/>
import a = require('./ServiceModule');
import b = require('./../controller/product/EditProductController');
import c = require('./../controller/product/ListProductController');
import d = require('./../controller/user/AuthUserController');
import f = require('./../controller/MainNavbarController');
import e = require('./../service/mock/DefaultAuthServiceMock');

declare var _: any;

export module modularity {
    export class ControllerModule {
        private controllerNgModule: ng.IModule;
        private serviceModule: a.modularity.ServiceModule;
        private routeProviderCfg = ($routeProvider: ng.IRouteProvider) => {
            $routeProvider
                .when('/', { redirectTo: '/user/auth' })
                .when('/user/auth', { templateUrl: 'views/user/authUser.html', controller: 'AuthUserCtrl' })
                .when('/product/list', { templateUrl: 'views/product/listProduct.html', controller: 'ListProductCtrl' })
                .when('/product/:productId/:mode?', { templateUrl: 'views/product/editProduct.html', controller: 'EditProductCtrl' })
                .otherwise({ redirectTo: '/' });
        };
        private locationProviderCfg = ($locationProvider: ng.ILocationProvider) => {
            //$locationProvider.html5Mode(true);
        };
    private authWatcherCfg = ($rootScope: ng.IRootScopeService, $location: ng.ILocationService, AuthService: e.service.mock.DefaultAuthService) => {
            var loginRoute = ['/user/auth'];
            var routeClean = (route) => {
                return _.find(loginRoute, (notLoginRoute) => {
                    return _.str.startsWith(route, notLoginRoute);
                });
            }

        $rootScope.$on('$routeChangeStart', (event, next, current) => {
                if (!routeClean($location.url()) && !AuthService.isLoggedIn()) {
                    $location.path('/user/auth');
                }
            })
    }

    constructor() {
            this.serviceModule = new a.modularity.ServiceModule().configure();
            this.controllerNgModule = angular.module('lwaControllerModule', ['lwaServiceModule', 'ngRoute', 'ngEkathuwa']);
        }

        configure() {
            this.controllerNgModule
                .config(['$routeProvider', this.routeProviderCfg])
                //.config(['$locationProvider', this.locationProviderCfg])
                .run(['$rootScope', '$location', 'AuthService', this.authWatcherCfg])

                .controller('AuthUserCtrl', <Function>d.controller.user.AuthUserController)
                .controller('MainNavbarCtrl', <Function>f.controller.MainNavbarController)
                .controller('ListProductCtrl', <Function>c.controller.product.ListProductController)
                .controller('EditProductCtrl', <Function>b.controller.product.EditProductController)

                ;

            return this;
        }
    }
}