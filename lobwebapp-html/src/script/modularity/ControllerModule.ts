///<reference path="./../reference.d.ts"/>
///<amd-dependency path="angularRoute"/>
///<amd-dependency path="angularUiRouter"/>

import f = require("./../controller/MainNavbarController");
import g = require("./../controller/AlertController");
import h = require("./../util/DependencyManager");
import AppRoutes = require("./AppRoutes");

export module modularity {
    export class ControllerModule {
        private $provide: ng.auto.IProvideService;

        constructor() {
            var mod = angular.module("lwa.controller", ["lwa.service", "ui.router"]);
            
            mod .config(["$controllerProvider", "$provide", ($controllerProvider: ng.IControllerProvider, $provide: ng.auto.IProvideService) => {
                    mod.lazy = {
                        controller: $controllerProvider.register,
                        service: $provide.service
                    };
                }])
                .config(["$stateProvider", "$urlRouterProvider", this.stateProviderCfg])
                .config(["$httpProvider", this.intercept401Cfg])

                .run(["$rootScope","NavigationService", this.rootscopeVariables])
                .run(["$rootScope", "$location", "AuthService", this.userAuthCfg])

                .controller("MainNavbarController", <Function>f.controller.MainNavbarController)
                .controller("AlertController", <Function>g.controller.AlertController)
                ;
        }

        private stateProviderCfg = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: any) => {
            $urlRouterProvider.otherwise("/user/auth");

            AppRoutes.routes.forEach((x)=> {
                $stateProvider.state(x.name, {
                    url: x.url.replace(x.baseUrl,""),
                    templateUrl: x.templateUrl,
                    controller: x.controller,
                    resolve: this.loadDependencies(x.deps)
                });
            });

        };
        
        private userAuthCfg = ($rootScope: ng.IRootScopeService, $location: ng.ILocationService, AuthService: d.service.contract.AuthService) => {
            var allowedRoutes = ["/user/auth"];
            var isAllowedRoute = (route: string) => {
                return allowedRoutes.some((x) => {
                    return x === route;
                });
            };
            $rootScope.$on("$stateChangeStart", (event: any, to: string, toParams: any, from: string, fromParams: any) => {
                // if route requires auth and user is not logged in
                var from = $location.path();
                if (!isAllowedRoute(from) && !AuthService.isLoggedIn()) {
                    // redirect back to login
                    event.preventDefault();
                    console.log("State Watcher: user not authenticated, redirecting ...");
                    $location.path("/user/auth");
                }
            });
        };
        
        private intercept401Cfg = ($httpProvider) => {
            var logoutUserOn401 = ["$q", "$location", ($q: ng.IQService, $location: ng.ILocationService) => {
                return{
                    "responseError" : (response) => {
                        if(response.status == 401){
                            $location.url("/user/auth?error=0");
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

        private rootscopeVariables = ($rootScope: d.controller.base.ViewModel, NavigationService: d.service.contract.NavigationService) => {
            $rootScope.navigator = NavigationService;
        }

        loadDependencies(deps: Array<string>){
            if(deps.length === 0) return;
            var definition = {
                resolver: ["$q", "$rootScope", ($q: ng.IQService, $rootScope: ng.IRootScopeService) => {
                    return (new h.util.DependencyManager($q, $rootScope)).resolve(deps, "lwa.controller");
                }]
            }
            return definition;
        }
    }
}