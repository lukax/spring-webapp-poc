///<reference path="../reference.d.ts"/>

///<amd-dependency path="angularRoute"/>
import a = require("./ServiceModule");
import f = require("./../controller/MainNavbarController");
import g = require("./../controller/AlertController");
import h = require("./../util/DependencyManager");
import AppRoutes = require("./AppRoutes");

export module modularity {
    export class ControllerModule {
        constructor() {
            new a.modularity.ServiceModule();
            var mod = angular.module("lwa.controller", ["ngRoute", "lwa.service"]);
            
            mod .config(["$controllerProvider", "$provide", "$compileProvider", "$filterProvider", ($controllerProvider: ng.IControllerProvider, $provide: ng.auto.IProvideService,
                         $compileProvider: ng.ICompileProvider, $filterProvider: ng.IFilterProvider) => {
                    mod.lazy = {
                        controller: $controllerProvider.register,
                        service: $provide.service,
                        directive: $compileProvider.directive,
                        filter: $filterProvider.register
                    };
                }])
                .config(["$routeProvider", this.routeProviderCfg])
                .config(["$locationProvider", this.enableHtml5])
                .config(["$httpProvider", this.intercept401])

                .run(["$rootScope","NavigatorService", this.setRootScopeVariables])
                .run(["$rootScope", "$location", "AuthService", "$timeout", this.blockNotAllowedUrls])

                .controller("MainNavbarController", <Function>f.controller.MainNavbarController)
                .controller("AlertController", <Function>g.controller.AlertController)
                ;
        }

        routeProviderCfg = ($routeProvider: ng.IRouteProvider) => {
            AppRoutes.routes.forEach((x)=> {
                $routeProvider.when(x.url, {
                    controller: x.controller,
                    templateUrl: x.templateUrl,
                    resolve: this.loadDependencies(x.deps) 
                    });
                });
            $routeProvider.otherwise(AppRoutes.main().url);
        };

        enableHtml5 = ($locationProvider: ng.ILocationProvider) => {
            $locationProvider.html5Mode(true);
        };
        
        blockNotAllowedUrls = ($rootScope: ng.IRootScopeService, $location: ng.ILocationService, AuthService: d.service.contract.AuthService, $timeout: ng.ITimeoutService) => {
            var isAllowedUrl = (route: string) => {
                return route == AppRoutes.main().url;
            };
            $rootScope.$on("$routeChangeStart", (event: any, to: any, toParams: any, from: any, fromParams: any) => {
                if(!isAllowedUrl(to.originalPath) && !AuthService.isLoggedIn()){
                    event.preventDefault();
                    $location.url(AppRoutes.main().errorUrl);
                    $location.replace();
                }
            });
        };
        
        intercept401 = ($httpProvider) => {
            var logoutUserOn401 = ["$q", "$location", ($q: ng.IQService, $location: ng.ILocationService) => {
                return{
                    "responseError" : (response) => {
                        if(response.status == 401){
                            $location.url(AppRoutes.main().errorUrl);
                            $location.replace();
                            return $q.reject(response);
                        }
                        if (response.status == 500) {
                            return $q.reject(response);
                        }
                        else {
                            return $q.reject(response);
                        }
                    }
                }
            }];
            $httpProvider.interceptors.push(logoutUserOn401);
        }

        setRootScopeVariables = ($rootScope: d.controller.base.ViewModel, NavigatorService: d.service.contract.NavigatorService) => {
            $rootScope.navigator = NavigatorService;
        }

        loadDependencies(deps: Array<string>){
            if(deps.length === 0) return;
            var definition = {
                resolver: ["$q", "$rootScope", "Progress", ($q: ng.IQService, $rootScope: ng.IRootScopeService, Progress: d.service.contract.Progress) => {
                    return (new h.util.DependencyManager($q, $rootScope, Progress)).resolve(deps, "lwa.controller");
                }]
            }
            return definition;
        }
    }
}