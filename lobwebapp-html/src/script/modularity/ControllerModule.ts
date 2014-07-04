///<reference path="../reference.d.ts"/>

///<amd-dependency path="angularRoute"/>
import f = require("./../controller/MainNavbarController");
import g = require("./../controller/AlertController");
import h = require("./../util/DependencyManager");
import AppRoutes = require("./AppRoutes");

export module modularity {
    export class ControllerModule {
        constructor(public profile: string) {
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
                .config(["$locationProvider", this.html5Cfg])
                .config(["$httpProvider", this.httpInterceptorsCfg])

                .run(["$rootScope","NavigatorService", this.scopeVariablesCfg])
                .run(["$rootScope", "$location", "AuthService", "$timeout", this.eventListenersCfg])

                .controller("MainNavbarController", <Function>f.controller.MainNavbarController)
                .controller("AlertController", <Function>g.controller.AlertController)
                ;
        }

        routeProviderCfg = ($routeProvider: ng.IRouteProvider) => {
           	AppRoutes.applyProfile(this.profile);

            (<any>$routeProvider).whenAppRoute = (route: AppRoutes.AppRoute) => {
                var resolve = {};
                if(route.secured)
                    angular.extend(resolve, this.authenticationResolver());
                if(route.deps)
                    angular.extend(resolve, this.dependencyResolver(route.deps));
                return $routeProvider.when(route.url, {
                    controller: route.controller,
                    templateUrl: route.templateUrl,
                    resolve: resolve
                    });
                }

            AppRoutes.routes.forEach((x)=> {
                (<any>$routeProvider).whenAppRoute(x);
                });

            $routeProvider.otherwise({ redirectTo: AppRoutes.main().url });
        };

        html5Cfg = ($locationProvider: ng.ILocationProvider) => {
            $locationProvider.html5Mode(true);
        };
        
        eventListenersCfg = ($rootScope: ng.IRootScopeService, $location: ng.ILocationService, AuthService: d.service.contract.AuthService, $timeout: ng.ITimeoutService) => {
            $rootScope.$on("$routeChangeError", (event: any, current: any, previous: any, rejection: any) => {
                $location.url(AppRoutes.main().errorUrl)
                    .search(rejection)
                    .replace();
            });
        };
        
        httpInterceptorsCfg = ($httpProvider) => {
            var logoutUserOn401 = ["$q", "$location", ($q: ng.IQService, $location: ng.ILocationService) => {
                return{
                    "responseError" : (response) => {
                        if(response.status == 401){
                            return $q.reject({ error: 1 });
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

        scopeVariablesCfg = ($rootScope: d.controller.base.IAppScope, NavigatorService: d.service.contract.NavigatorService) => {
            $rootScope.navigator = NavigatorService;
        }

        authenticationResolver(){
            var definition = {
                authentication: ["$q", "AuthService", ($q: ng.IQService, AuthService: d.service.contract.AuthService) => {
                    var deferred = $q.defer();
                    if(AuthService.isLoggedIn()) 
                        deferred.resolve();
                    else 
                        deferred.reject({ error: 0 });
                    return (deferred.promise);
                    }]
            }
            return definition;
        }

        dependencyResolver(deps: Array<string>){
            var definition = {
                dependencies: ["$q", "$rootScope", "Progress", ($q: ng.IQService, $rootScope: ng.IRootScopeService, Progress: d.service.contract.Progress) => {
                    return (new h.util.DependencyManager($q, $rootScope, Progress)).resolve(deps, "lwa.controller");
                }]
            }
            return definition;
        }
    }
}