///<reference path="../reference.d.ts"/>

///<amd-dependency path="angularUiRouter"/>
import f = require("./../controller/MainNavbarController");
import g = require("./../controller/AlertController");
import h = require("./../util/DependencyManager");
import AppRoutes = require("./AppRoutes");

export module modularity {
    export class ControllerModule {
        constructor() {
            var mod = angular.module("lwa.controller", ["lwa.service", "ui.router"]);
            
            mod .config(["$controllerProvider", "$provide", "$compileProvider", "$filterProvider", ($controllerProvider: ng.IControllerProvider, $provide: ng.auto.IProvideService,
                         $compileProvider: ng.ICompileProvider, $filterProvider: ng.IFilterProvider) => {
                    mod.lazy = {
                        controller: $controllerProvider.register,
                        service: $provide.service,
                        directive: $compileProvider.directive,
                        filter: $filterProvider.register
                    };
                }])
                .config(["$stateProvider", "$urlRouterProvider", this.stateProviderCfg])
                .config(["$httpProvider", this.intercept401])
                .config(["$locationProvider", this.html5Cfg])

                .run(["$rootScope","Navigator", this.setRootScopeVariables])
                .run(["$rootScope", "$location", "AuthService", this.blockNotAllowedStates])

                .controller("MainNavbarController", <Function>f.controller.MainNavbarController)
                .controller("AlertController", <Function>g.controller.AlertController)
                ;
        }

        stateProviderCfg = ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: any) => {
            $urlRouterProvider.otherwise("/user/auth");

            AppRoutes.routes.forEach((x)=> {
                $stateProvider.state(x.name, {
                    url: x.url,
                    templateUrl: x.templateUrl,
                    controller: x.controller,
                    resolve: this.loadDependencies(x.deps)
                });
            });

        };

        html5Cfg = ($locationProvider: ng.ILocationProvider) => {
            $locationProvider.html5Mode(true);
        };
        
        blockNotAllowedStates = ($rootScope: ng.IRootScopeService, $location: ng.ILocationService, AuthService: d.service.contract.AuthService) => {
            var allowedStates = ["userAuth"];
            var isAllowedState = (route: string) => {
                return allowedStates.some((x) => {
                    return x === route;
                });
            };
            $rootScope.$on("$stateChangeStart", (event: any, to: any, toParams: any, from: any, fromParams: any) => {
                // if route requires auth and user is not logged in
                if (!isAllowedState(to.name) && !AuthService.isLoggedIn()) {
                    // redirect back to login
                    event.preventDefault();
                    console.log("User not authenticated, redirecting ...");
                    $location.url("/user/auth");
                }
            });
        };
        
        intercept401 = ($httpProvider) => {
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

        setRootScopeVariables = ($rootScope: d.controller.base.ViewModel, Navigator: d.service.contract.Navigator) => {
            $rootScope.navigator = Navigator;
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