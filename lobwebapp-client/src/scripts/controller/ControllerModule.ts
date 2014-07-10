///<reference path="../reference.ts"/>

var ControllerModule = angular.module("lwa.controller", ["ngRoute", "lwa.service"]);

ControllerModule
    .config(["$controllerProvider", "$provide", "$compileProvider", "$filterProvider", controller.ControllerModuleConfig.lazyLoadCfg])
    .config(["$routeProvider", controller.ControllerModuleConfig.routeProviderCfg])
    .config(["$locationProvider", controller.ControllerModuleConfig.html5Cfg])
    .config(["$httpProvider", controller.ControllerModuleConfig.httpInterceptorsCfg])

    .run(["$rootScope","NavigatorService", controller.ControllerModuleConfig.scopeVariablesCfg])
    .run(["$rootScope", "$location", "AuthService", "$timeout", controller.ControllerModuleConfig.eventListenersCfg])

    .controller("MainNavbarController", controller.MainNavbarController)
    .controller("AlertController", controller.AlertController)

    .controller("EditCustomerController", controller.customer.EditCustomerController)
    .controller("ListCustomerController", controller.customer.ListCustomerController)
    .controller("EditOrderController", controller.order.EditOrderController)
    .controller("ListOrderController", controller.order.ListOrderController)
    .controller("EditProductController", controller.product.EditProductController)
    .controller("ListProductController", controller.product.ListProductController)
    .controller("EditStockController", controller.stock.EditStockController)
    .controller("ListStockController", controller.stock.ListStockController)
    .controller("AuthUserController", controller.user.AuthUserController)
    ;

module controller {
    export class ControllerModuleConfig {
        static lazyLoadCfg = ($controllerProvider: ng.IControllerProvider, $provide: ng.auto.IProvideService,
                              $compileProvider: ng.ICompileProvider, $filterProvider: ng.IFilterProvider) => {
            (<any>ControllerModule).lazy = {
                controller: $controllerProvider.register,
                service: $provide.service,
                directive: $compileProvider.directive,
                filter: $filterProvider.register
            };
        };

        static routeProviderCfg = ($routeProvider:ng.route.IRouteProvider) => {
            (<any>$routeProvider).whenAppRoute = (route: core.AppRoute) => {
                var resolve = {};
                if (route.secured)
                    angular.extend(resolve, ControllerModuleConfig.authenticationResolver());
                //TODO: Resolve some dependencies async
                //if(route.deps)
                //    angular.extend(resolve, this.dependencyResolver(route.deps));
                return $routeProvider.when(route.url, {
                    controller: route.controller,
                    templateUrl: route.templateUrl,
                    resolve: resolve
                });
            };

            core.routes.forEach((x)=> {
                (<any>$routeProvider).whenAppRoute(x);
            });

            $routeProvider.otherwise({ redirectTo: core.mainRoute().url });
        };

        static html5Cfg = ($locationProvider:ng.ILocationProvider) => {
            $locationProvider.html5Mode(true);
        };

        static eventListenersCfg = ($rootScope:ng.IRootScopeService, $location:ng.ILocationService, AuthService:service.contract.AuthService, $timeout:ng.ITimeoutService) => {
            $rootScope.$on("$routeChangeError", (event:any, current:any, previous:any, rejection:any) => {
                $location.url(core.mainRoute().errorUrl)
                    .search(rejection)
                    .replace();
            });
        };

        static httpInterceptorsCfg = ($httpProvider) => {
            var logoutUserOn401 = ["$q", "$location", ($q:ng.IQService, $location:ng.ILocationService) => {
                return{
                    "responseError": (response) => {
                        if (response.status == 401) {
                            $location.url(core.mainRoute().errorUrl)
                                .search({error: 1})
                                .replace();
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
        };

        static scopeVariablesCfg = ($rootScope:controller.base.IAppScope, NavigatorService:service.contract.NavigatorService) => {
            $rootScope.navigator = NavigatorService;
        };

        static authenticationResolver = () => {
            var definition = {
                authentication: ["$q", "AuthService", ($q:ng.IQService, AuthService:service.contract.AuthService) => {
                    var deferred = $q.defer();
                    if (AuthService.isLoggedIn())
                        deferred.resolve();
                    else
                        deferred.reject({ error: 0 });
                    return (deferred.promise);
                }]
            };
            return definition;
        };

        static dependencyResolver = (deps:Array<string>) => {
            var definition = {
                dependencies: ["$q", "$rootScope", "Progress", ($q:ng.IQService, $rootScope:ng.IRootScopeService, Progress:service.contract.Progress) => {
                    return (new util.DependencyManager($q, $rootScope, Progress)).resolve(deps, "lwa.controller");
                }]
            };
            return definition;
        };

    }
}