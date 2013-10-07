///<reference path="../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularRoute"/>
///<amd-dependency path="underscore"/>
///<amd-dependency path="underscoreString"/>
///<amd-dependency path="angularUiRouter"/>
///<amd-dependency path="ngAnimateAnimate"/>
///<amd-dependency path="ngEkathuwa"/>
import a = require('./ServiceModule');
import b = require('./../controller/product/EditProductController');
import c = require('./../controller/product/ListProductController');
import d = require('./../controller/user/AuthUserController');
import e = require('./../service/mock/AuthServiceMock');
import f = require('./../controller/MainNavbarController');
import g = require('./../controller/user/BoardUserController');

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
        private stateProviderCfg = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: any) => {
            $urlRouterProvider.otherwise('/user/auth');

            $stateProvider

                // -User-
                .state('user', {
                    url: '/user',
                    templateUrl: 'views/user/user.html'
                })
                .state('user.auth', {
                    url: '/auth',
                    templateUrl: 'views/user/authUser.html',
                    controller: 'AuthUserCtrl'
                })
                .state('user.board', {
                    url: '/board',
                    templateUrl: 'views/user/boardUser.html',
                    controller: 'BoardUserCtrl'
                })
                // -Product-
                .state('product',{
                    url:'/product',
                    templateUrl: 'views/product/product.html'
                })
                .state('product.list',{
                    url: '/list?find',
                    templateUrl: 'views/product/listProduct.html',
                    controller: 'ListProductCtrl'
                })
                .state('product.edit', {
                    url: '/{productId:[0-9]{1,8}|new}?priceInfo', //0-9 numbers in 1-8 digits match
                    templateUrl: 'views/product/editProduct.html',
                    controller: 'EditProductCtrl'
                })
            ;
        };
        private locationProviderCfg = ($locationProvider: ng.ILocationProvider) => {
            //$locationProvider.html5Mode(true);
        };
        private authWatcherCfg = ($rootScope: ng.IRootScopeService, $location: ng.ILocationService, $timeout: ng.ITimeoutService, AuthService: e.service.mock.DefaultAuthService) => {
            var allowedRoutes = ['/user/auth'];
            var isAllowedRoute = (route: string) => {
                return _.find(isAllowedRoute, (noAuthRoute: string) => {
                        return _.str.startsWith(route, noAuthRoute);
                    });
            };
            // -ngRoute-
//            $rootScope.$on('$routeChangeStart', (event, next, current) => {
//                if (!routeClean($location.url()) && !AuthService.isLoggedIn()) {
//                    $location.path('/user/auth');
//                }
//            })
            // -uiRouter-
            $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
                // if route requires auth and user is not logged in
                var from = $location.path();
                if (!isAllowedRoute(from) && !AuthService.isLoggedIn()) {
                    // redirect back to login
                    $location.path('/user/auth');
                }

                console.log('state changed (from: ' + from + ' to: ' + $location.path() + ' )');
            });
        };
        private intercept401Cfg = ($httpProvider) => {
            var logoutUserOn401 = ['$q', '$location', ($q: ng.IQService, $location: ng.ILocationService) => {
                return{
                    'responseError' : (response) => {
                        if(response.status == 401){
                            $location.url('/user/auth');
                            return $q.reject(response);
                        }else{
                            return $q.reject(response);
                        }
                    }
                }
            }];
            $httpProvider.interceptors.push(logoutUserOn401);
        }

        constructor() {
            this.serviceModule = new a.modularity.ServiceModule().configure();
            this.controllerNgModule = angular.module('lwa.controller', ['lwa.service', 'ui.router', 'ngEkathuwa']);
        }

        configure() {
            this.controllerNgModule
                //.config(['$routeProvider', this.routeProviderCfg])
                //.config(['$locationProvider', this.locationProviderCfg])
                .config(['$httpProvider', this.intercept401Cfg])
                .config(['$stateProvider', '$urlRouterProvider', this.stateProviderCfg])
                //.run(['$rootScope', '$location', '$timeout', 'AuthService', this.authWatcherCfg])

                .controller('AuthUserCtrl', <Function>d.controller.user.AuthUserController)
                .controller('BoardUserCtrl', <Function>g.controller.user.BoardUserController)
                .controller('MainNavbarCtrl', <Function>f.controller.MainNavbarController)
                .controller('ListProductCtrl', <Function>c.controller.product.ListProductController)
                .controller('EditProductCtrl', <Function>b.controller.product.EditProductController)

                ;

            return this;
        }
    }
}