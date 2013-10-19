///<reference path="./../reference.d.ts"/>
///<amd-dependency path="angular"/>
///<amd-dependency path="angularRoute"/>
///<amd-dependency path="angularUiRouter"/>
///<amd-dependency path="ngEkathuwa"/>

import a = require('./ServiceModule');
import e = require('./../service/mock/AuthServiceMock');
import f = require('./../controller/MainNavbarController');
import h = require('./../util/DependencyManager');

export module modularity {
    export class ControllerModule {
        private module: ng.IModule;
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
                    controller: 'AuthUserController',
                    resolve: this.loadController('controller/user/AuthUserController')
                })
                .state('user.board', {
                    url: '/board',
                    templateUrl: 'views/user/boardUser.html',
                    controller: 'BoardUserController',
                    resolve: this.loadController('controller/user/BoardUserController')
                })
                // -Product-
                .state('product',{
                    url:'/product',
                    templateUrl: 'views/product/product.html'
                })
                .state('product.list',{
                    url: '/list?find',
                    templateUrl: 'views/product/listProduct.html',
                    controller: 'ListProductController',
                    resolve: this.loadController('controller/product/ListProductController')
                })
                .state('product.edit', {
                    url: '/{productId:[0-9]{1,8}|new}?priceInfo', //0-9 numbers in 1-8 digits match
                    templateUrl: 'views/product/editProduct.html',
                    controller: 'EditProductController',
                    resolve: this.loadController('controller/product/EditProductController')
                })
                .state('product.graph',{
                    url: '/graph',
                    templateUrl: 'views/product/graphProduct.html',
                    controller: 'GraphProductController',
                    resolve: this.loadController('controller/product/GraphProductController')
                })
            ;
        };
        private locationProviderCfg = ($locationProvider: ng.ILocationProvider) => {
            //$locationProvider.html5Mode(true);
        };
        private userAuthCfg = ($rootScope: ng.IRootScopeService, $location: ng.ILocationService, AuthService: e.service.mock.DefaultAuthService) => {
            var allowedRoutes = ['/user/auth'];
            var isAllowedRoute = (route: string) => {
                return allowedRoutes.some((x) => {
                    return x === route;
                });
            };
            $rootScope.$on('$stateChangeStart', (event: any, to: string, toParams: any, from: string, fromParams: any) => {
                // if route requires auth and user is not logged in
                var from = $location.path();
                if (!isAllowedRoute(from) && !AuthService.isLoggedIn()) {
                    // redirect back to login
                    event.preventDefault();
                    console.log('State Watcher: user not authenticated, redirecting ...');
                    $location.path('/user/auth');
                }else if(from === '/user/auth' && AuthService.isLoggedIn()){
                    $location.path('/user/board');
                }
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
            new a.modularity.ServiceModule().configure();
            this.module = angular.module('lwa.controller', ['lwa.service', 'ui.router', 'ngEkathuwa']);
            this.module.config(['$controllerProvider', ($controllerProvider: ng.IControllerProvider) => {
                (<any>this.module).lazy = {
                    controller: $controllerProvider.register
                };
            }]);
        }

        configure() {
            this.module
                //.config(['$locationProvider', this.locationProviderCfg])
                .config(['$stateProvider', '$urlRouterProvider', this.stateProviderCfg])
                .config(['$httpProvider', this.intercept401Cfg])
                
                //.run(['$rootScope', this.contentLoadProgress])
                //.run(['$rootScope', '$location', 'AuthService', this.userAuthCfg])
                
                .controller('MainNavbarCtrl', <Function>f.controller.MainNavbarController)
                ;

            return this;
        }

        loadController(dependencyPath: string) {
            var definition = {
                resolver: ['$q', '$rootScope', ($q: ng.IQService, $rootScope: ng.IRootScopeService) => {
                    return (new h.util.DependencyManager($q, $rootScope)).resolve(dependencyPath);
                }]
            }
            return definition;
        }
    }
}